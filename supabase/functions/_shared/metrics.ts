// ALS-238: Structured metrics logging for Edge Functions
// Emits JSON log lines captured by Supabase → Loki log drain.
// Query in Grafana using LogQL: {source="edge-functions"} | json | type="metric"

export interface Counter {
  name: string;
  labels?: Record<string, string>;
  value?: number;
}

function emitMetric(
  fn: string,
  method: string,
  route: string,
  status: number,
  durationMs: number,
  counters: Counter[],
) {
  const base = {
    type: 'metric',
    fn,
    method,
    route,
    status,
    duration_ms: durationMs,
    error: status >= 500,
    timestamp: new Date().toISOString(),
  };

  console.log(JSON.stringify(base));

  for (const c of counters) {
    console.log(JSON.stringify({ type: 'metric', name: c.name, value: c.value ?? 1, ...c.labels }));
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
      emitMetric(fnName, req.method, route, 500, Date.now() - start, []);
      throw err;
    }

    const durationMs = Date.now() - start;
    emitMetric(fnName, req.method, route, res.status, durationMs, extraCounters?.(req, res) ?? []);

    return res;
  };
}
