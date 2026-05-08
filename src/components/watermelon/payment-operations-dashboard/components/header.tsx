"use client";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModeToggle } from "./theme-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DashboardHeader() {
  return (
    <header className="flex h-fit items-start justify-between gap-4 flex-col md:flex-row md:items-center">
      <div className="">
        <h1 className="text-2xl font-medium tracking-tight leading-tight cursor-default">
          Dashboard
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Showing data for the last
          <Select defaultValue="21">
            <SelectTrigger className="h-fit shadow-none rounded-md max-h-6 border-none bg-secondary dark:bg-secondary px-2 py-0 text-xs font-sm focus:ring-0 text-foreground hover:bg-secondary/80 dark:hover:bg-muted transition-colors duration-200">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 Days</SelectItem>
              <SelectItem value="21">21 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-row md:flex-row   ">
        <div className="relative w-full group/search">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-hover/search:text-foreground transition-colors duration-300" />
          <Input
            placeholder="Search Anything..."
            className="pl-9 h-9 bg-muted border-none focus-visible:ring-1 hover:bg-secondary dark:hover:bg-muted transition-colors duration-300 rounded-lg shadow-[rgba(12,0,46,0.04)_0px_2px_4px_0px]"
          />
        </div>
        <div className="flex gap-4 items-center w-full     ">
          <div className="flex items-center gap-2 md:border-l dark:border-zinc-500 pl-4">
            <span className="text-sm text-muted-foreground">Test Mode</span>
            <Switch className="data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary" />
          </div>

          <Dialog>
            <DialogTrigger render={<Button size="icon" className="size-8 rounded-full bg-primary dark:bg-primary hover:bg-rsvpify-dark transition-colors duration-300 shadow-md group/btn" />}><Plus className="size-4 text-primary-foreground dark:text-primary-foreground" /></DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-lg shadow-2xl p-0 overflow-hidden border-border dark:border-border">
              <div className="p-6 pb-0">
                <DialogHeader>
                  <DialogTitle className="text-xl">New Transaction</DialogTitle>
                  <DialogDescription>
                    Start a manual payment or invoice.
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="p-6 grid gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="customer" className="text-sm font-medium text-foreground">Customer Name</label>
                  <Input id="customer" placeholder="Enter name or email" className="h-9 rounded-none bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-1" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="amount" className="text-sm font-medium text-foreground">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">₹</span>
                    <Input id="amount" type="number" placeholder="0.00" className="pl-7 h-9 rounded-none bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-1" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="method" className="text-sm font-medium text-foreground">Payment Method</label>
                  <Select>
                    <SelectTrigger className="h-9 rounded-none bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-1">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="card">Credit Card</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
                <Button variant="outline" className="rounded-full h-9 text-xs font-medium border-primary text-primary hover:bg-secondary dark:hover:bg-muted">Cancel</Button>
                <Button type="submit" className="rounded-full h-9 text-xs font-medium bg-primary text-primary-foreground hover:bg-rsvpify-dark transition-colors">Create Transaction</Button>
              </div>
            </DialogContent>
          </Dialog>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
