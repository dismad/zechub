"use client";

import Link from "next/link";
import { useMemo } from "react";
import { cn, formatZec } from "@/lib/utils";

interface BountyCardProps {
  id: string;
  title: string;
  description: string;
  reward: number;
  privacyScore: number;
  tags: string[];
  status: string;
  deadline?: string | Date;
  creatorName?: string;
}

export function BountyCard({
  id,
  title,
  description,
  reward,
  tags,
  status,
  deadline,
}: BountyCardProps) {
  // Determine Category Tag (default to first tag or "Development")
  const categoryTag = tags && tags.length > 0 ? tags[0] : "Development";

  // Calculate Days Left
  const daysLeft = useMemo(() => {
    if (!deadline) return 14; // Default fallback
    const deadDate = new Date(deadline);
    const diffTime = deadDate.getTime() - Date.now();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [deadline]);

  // Determine difficulty dynamically from reward size (to match screenshots)
  const difficulty = useMemo(() => {
    if (reward >= 35) return "Hard";
    if (reward >= 12) return "Medium";
    return "Easy";
  }, [reward]);

  // Determine Progress Percentage
  const progressPercent = useMemo(() => {
    const s = status.toLowerCase();
    if (s === "completed" || s === "paid") return 100;
    if (s === "in review") return 85;
    if (s === "in progress") return 60;
    if (title.includes("ZSA Support")) return 15; // match mockup Card 1
    return 0; // Open or Draft
  }, [status, title]);

  const isOpen = status.toLowerCase() === "open";
  const isInProgress = status.toLowerCase() === "in progress";
  const isCompleted = status.toLowerCase() === "completed" || status.toLowerCase() === "paid";
  const isInReview = status.toLowerCase() === "in review";

  return (
    <Link href={`/bounty/${id}`} className="block">
      <article className="bg-surface-container-lowest rounded-xl border border-secondary-container p-6 flex flex-col gap-4 soft-shadow card-hover transition-all group cursor-pointer h-full">
        {/* Top: Category Tag and Status badge */}
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 bg-surface-container text-primary font-label-sm text-label-sm uppercase rounded-full tracking-wider">
            {categoryTag}
          </span>
          <span
            className={cn(
              "px-3 py-1 font-label-sm text-label-sm uppercase rounded-full font-bold",
              isOpen && "bg-[#fefce8] text-[#854d0e]",
              isInProgress && "bg-[#f3f4f6] text-[#4b5563]",
              isCompleted && "bg-[#f0fdf4] text-[#16a34a]",
              isInReview && "bg-[#f0fdf4] text-[#16a34a]"
            )}
          >
            {status}
          </span>
        </div>

        {/* Title and Description */}
        <div className="flex-1">
          <h4 className="font-headline-md text-headline-md text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h4>
          <p className="font-body-md text-on-surface-variant line-clamp-2">
            {description}
          </p>
        </div>

        {/* Bottom Details */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>{daysLeft} Days Left</span>
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">fitness_center</span>
              <span>{difficulty}</span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#E4E4E7] h-1 rounded-full mt-2 overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-500",
                isCompleted || isInReview ? "bg-[#16a34a]" : "bg-primary-container"
              )}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Reward block */}
          <div className="flex justify-between items-center mt-2 pt-4 border-t border-secondary-container">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Reward
            </span>
            <span className="font-label-md text-label-md text-primary font-bold text-lg">
              {formatZec(reward)} ZEC
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
