import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BanknoteX, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PaymentsSummary() {
  const data = [
    {
      label: "Succeeded",
      amount: "₹3,42,800",
      color: "bg-green-500",
      width: "w-[60%]",
    },
    {
      label: "Uncaptured",
      amount: "₹0",
      color: "bg-yellow-400",
      width: "w-[10%]",
    },
    {
      label: "Refunded",
      amount: "₹4,200",
      color: "bg-orange-500",
      width: "w-[15%]",
    },
    {
      label: "Failed",
      amount: "₹18,450",
      color: "bg-red-500",
      width: "w-[15%]",
    },
  ];

  return (
    <Card className="border-none shadow-sm bg-secondary dark:bg-secondary rounded-lg p-0.5 gap-0 group/card">
      <CardHeader className="flex flex-row items-center gap-2 p-2">
        <div className="bg-muted p-1 rounded">
          <BanknoteX className="size-4 text-muted-foreground group-hover/card:text-foreground transition-colors" />
        </div>
        <CardTitle className="text-md font-medium text-foreground">
          Payments
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-card dark:bg-card p-4 rounded-lg">
        <div className="flex h-3 w-full rounded-full overflow-hidden mb-6 gap-1 ">
          {data.map((item, i) => (
            <div
              key={i}
              className={`${item.color} border border-${item.color}/10 last:border-none ${item.width}  `}
            />
          ))}
        </div>
        <div className="space-y-3">
          {data.map((item, i) => (
            <div key={i} className="flex justify-between items-center text-sm p-2 -mx-2 hover:bg-muted/50 rounded-md transition-colors duration-200 cursor-pointer group">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${item.color}`} />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">{item.label}</span>
              </div>
              <span className="font-medium tabular-nums">{item.amount}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between items-center text-xs text-muted-foreground">
          <Popover>
            <PopoverTrigger render={<button className="text-muted-foreground font-medium text-sm underline underline-offset-3 hover:text-foreground transition-colors duration-200" />}>View More
                                    </PopoverTrigger>
            <PopoverContent align="start" className="w-80 p-0 rounded-lg shadow-xl border border-border dark:border-border">
              <div className="p-4 border-b border-border dark:border-border bg-muted dark:bg-muted/50">
                <h4 className="font-semibold text-foreground">Detailed Breakdown</h4>
                <p className="text-xs text-muted-foreground">Extended analytics for the current period.</p>
              </div>
              <div className="p-4 space-y-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">Successful Trxs</span>
                    <span className="font-semibold tabular-nums">1,248</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary dark:bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[85%] rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">Failed Trxs</span>
                    <span className="font-semibold tabular-nums">42</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary dark:bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[5%] rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">Refund Rate</span>
                    <span className="font-semibold tabular-nums">2.1%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary dark:bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[10%] rounded-full" />
                  </div>
                </div>
              </div>
              <div className="p-2 border-t border-border dark:border-border bg-muted dark:bg-muted/50">
                <Button variant="ghost" className="w-full h-8 text-xs font-medium justify-between group hover:bg-secondary dark:hover:bg-secondary rounded-md text-foreground">
                  Open full analytics
                  <ArrowUpRight className="size-3.5" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <span className="text-muted-foreground text-sm font-medium">
            Last updated 6h ago
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
