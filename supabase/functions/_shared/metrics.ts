// ALS-238: Prometheus Pushgateway metrics helper for Edge Functions

const PUSHGATEWAY_URL = Deno.env.get('PROMETHEUS_PUSHGATEWAY_URL');
const PUSHGATEWAY_USER = Deno.env.get('PROMETHEUS_PUSHGATEWAY_USER');
const PUSHGATEWAY_PASS = Deno.env.get('PROMETHEUS_PUSHGATEWAY_PASS');

export interface RequestMetrics {
  fn: string;
  method: string;
  route: string;
  status: number;
  durationMs: number;
}

export interface Counter {
  name: string;
  labels?: Record<string, string>;
  value?: number;
}

function fmtLabels(labels: Record<string, string>): string {
  return Object.entries(labels)
    .map(([k, v]) => `${k}="${v.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`)
    .join(',');
}

function buildPayload(req: RequestMetrics, counters: Counter[]): string {
  const reqLabels = fmtLabels({ fn: req.fn, method: req.method, route: req.route, status: String(req.status) });
  const fnLabels = fmtLabels({ fn: req.fn });

  const lines = [
    `# TYPE lop_http_requests_total counter`,
    `lop_http_requests_total{${reqLabels}} 1`,
    `# TYPE lop_http_request_duration_ms gauge`,
    `lop_http_request_duration_ms{${fnLabels}} ${req.durationMs}`,
  ];

  if (req.status >= 500) {
    lines.push(`# TYPE lop_http_errors_total counter`, `lop_http_errors_total{${fnLabels}} 1`);
  }

  for (const c of counters) {
    const lblStr = c.labels ? `{${fmtLabels(c.labels)}}` : '';
    lines.push(`# TYPE ${c.name} counter`, `${c.name}${lblStr} ${c.value ?? 1}`);
  }

  return lines.join('\n') + '\n';
}

export async function pushMetrics(req: RequestMetrics, counters: Counter[] = []): Promise<void> {
  if (!PUSHGATEWAY_URL) return;

  const payload = buildPayload(req, counters);
  const url = `${PUSHGATEWAY_URL}/metrics/job/lop_edge/instance/${req.fn}`;
  const headers: Record<string, string> = { 'Content-Type': 'text/plain' };

  if (PUSHGATEWAY_USER && PUSHGATEWAY_PASS) {
    headers['Authorization'] = `Basic ${btoa(`${PUSHGATEWAY_USER}:${PUSHGATEWAY_PASS}`)}`;
  }

  try {
    await fetch(url, { method: 'POST', headers, body: payload });
  } catch {
    // Non-blocking — never fail a request over metrics
  }
}

export function withMetrics(
  fnName: string,
  handler: (req: Request) => Promise<Response>,
  extraCounters?: (req: Request, res: Response) => Counter[],
): (req: Request) => Promise<Response> {
  return async (req: Request): Promise<Response> => {
    const start = Date.now();
    const url = new URL(req.url);
    // Normalise route: replace UUIDs with :id to avoid high cardinality
    const route = url.pathname.replace(
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi,
      ':id',
    );

    let res: Response;
    try {
      res = await handler(req);
    } catch (err) {
      const durationMs = Date.now() - start;
      pushMetrics({ fn: fnName, method: req.method, route, status: 500, durationMs }).catch(() => {});
      throw err;
    }

    const durationMs = Date.now() - start;
    const counters = extraCounters?.(req, res) ?? [];
    pushMetrics({ fn: fnName, method: req.method, route, status: res.status, durationMs }, counters).catch(() => {});

    return res;
  };
}
