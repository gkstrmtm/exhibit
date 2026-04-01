import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "@/components/layout";
import { useAuth } from "@/lib/auth";
import { Shield, Users, Code2, Trophy, Package, AlertTriangle, CheckCircle, Loader2, Eye, Ban, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Report } from "@shared/schema";

export default function AdminPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"overview" | "reports" | "audit">("overview");

  const { data: stats } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    },
    enabled: user?.role === "admin",
  });

  const { data: reports = [] } = useQuery<Report[]>({
    queryKey: ["/api/admin/reports"],
    queryFn: async () => {
      const res = await fetch("/api/admin/reports");
      return res.json();
    },
    enabled: user?.role === "admin" && activeTab === "reports",
  });

  const { data: auditLogs = [] } = useQuery<any[]>({
    queryKey: ["/api/admin/audit-logs"],
    queryFn: async () => {
      const res = await fetch("/api/admin/audit-logs");
      return res.json();
    },
    enabled: user?.role === "admin" && activeTab === "audit",
  });

  const resolveMutation = useMutation({
    mutationFn: async ({ id, resolution }: { id: number; resolution: string }) => {
      await fetch(`/api/admin/reports/${id}/resolve`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resolution }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/reports"] }),
  });

  if (user?.role !== "admin") {
    return (
      <Layout>
        <div className="text-center py-20">
          <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
          <h2 className="text-xl font-semibold mb-2">Admin Access Required</h2>
          <p className="text-muted-foreground text-sm">You need administrator privileges to view this page.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 data-testid="text-admin-title" className="text-3xl font-display font-bold tracking-tight mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8 text-red-500" />
          Admin Console
        </h1>
        <p className="text-muted-foreground">Platform management, moderation, and analytics.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-muted/50 p-1 rounded-lg w-fit border border-border/50">
        {(["overview", "reports", "audit"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn("px-4 py-2 text-sm font-medium rounded-md transition-all capitalize",
              activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Users", value: stats.users, icon: Users, color: "text-blue-600" },
            { label: "Exhibits", value: stats.exhibits, icon: Code2, color: "text-emerald-600" },
            { label: "Challenges", value: stats.challenges, icon: Trophy, color: "text-amber-600" },
            { label: "Packs", value: stats.packs, icon: Package, color: "text-purple-600" },
            { label: "Purchases", value: stats.purchases, icon: CheckCircle, color: "text-pink-600" },
          ].map(stat => (
            <div key={stat.label} className="p-6 border border-border rounded-xl bg-card">
              <stat.icon className={cn("w-5 h-5 mb-3", stat.color)} />
              <div className="text-3xl font-bold tracking-tight tabular-nums mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-4">
          {reports.length === 0 && (
            <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border">
              <CheckCircle className="w-8 h-8 mx-auto mb-3 text-emerald-500" />
              <p className="text-sm text-muted-foreground">No reports to review. All clear.</p>
            </div>
          )}
          {reports.map(report => (
            <div key={report.id} className="p-4 border border-border rounded-lg bg-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="font-medium text-sm capitalize">{report.category}</span>
                    <span className={cn("px-2 py-0.5 text-xs rounded-full font-medium",
                      report.status === "open" ? "bg-red-50 dark:bg-red-950 text-red-600" : "bg-emerald-50 dark:bg-emerald-950 text-emerald-600"
                    )}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />{new Date(report.createdAt).toLocaleString()}
                  </div>
                </div>
                {report.status === "open" && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => resolveMutation.mutate({ id: report.id, resolution: "Reviewed and dismissed" })}
                      className="px-3 py-1.5 text-xs font-medium bg-muted rounded-md hover:bg-muted/80"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => resolveMutation.mutate({ id: report.id, resolution: "Action taken" })}
                      className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Take Action
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "audit" && (
        <div className="space-y-2">
          {auditLogs.length === 0 && (
            <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border">
              <p className="text-sm text-muted-foreground">No audit logs yet.</p>
            </div>
          )}
          {auditLogs.map((log: any) => (
            <div key={log.id} className="flex items-center gap-3 p-3 border-b border-border/50 text-sm">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{log.userId || "?"}</div>
              <div className="flex-1">
                <span className="font-medium">{log.action}</span>
                <span className="text-muted-foreground"> on {log.targetType} #{log.targetId}</span>
              </div>
              <div className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
