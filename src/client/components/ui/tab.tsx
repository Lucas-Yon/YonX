import type { FC } from "hono/jsx";
import type { Child } from "hono/jsx";
import { cn } from "@/components/utils";

// Types
type TabsProps = {
  defaultTab?: number;
  className?: string;
  id?: string;
  children: Child;
};

type TabsListProps = {
  className?: string;
  children: Child;
};

type TabProps = {
  index: number;
  className?: string;
  children: Child;
};

type TabsContentProps = {
  index: number;
  className?: string;
  children: Child;
};

// Utility for combining classes

// Components
export const Tabs: FC<TabsProps> = ({
  defaultTab = 1,
  id,
  className,
  children,
}) => {
  // Generate unique ID for this tabs instance
  const uniqueId = id ? id : Math.random().toString(36).substring(2, 9);

  return (
    <div
      x-data={`{
        tabSelected: ${defaultTab},
        tabId: '${uniqueId}',
        tabButtonClicked(tabButton) {
          this.tabSelected = parseInt(tabButton.dataset.index);
          this.tabRepositionMarker(tabButton);
        },
        tabRepositionMarker(tabButton) {
          this.$refs.tabMarker.style.width = tabButton.offsetWidth + 'px';
          this.$refs.tabMarker.style.height = tabButton.offsetHeight + 'px';
          this.$refs.tabMarker.style.left = tabButton.offsetLeft + 'px';
        },
        tabContentActive(tabContent) {
          return this.tabSelected === parseInt(tabContent.dataset.index);
        }
      }`}
      x-init="tabRepositionMarker($refs.tabButtons.firstElementChild);"
      className={cn("relative w-full", className)}
    >
      {children}
    </div>
  );
};

export const TabsList: FC<TabsListProps> = ({ className, children }) => {
  return (
    <div
      x-ref="tabButtons"
      className={cn(
        "relative inline-grid items-center justify-center w-full h-10 p-1",
        "bg-muted text-muted-foreground rounded-lg select-none",
        `grid-cols-2`,
        className
      )}
    >
      {children}
      <div
        x-ref="tabMarker"
        className="absolute left-0 z-10 w-1/2 h-full duration-300 ease-out"
        x-cloak
      >
        <div className="w-full h-full bg-background rounded-md shadow-sm"></div>
      </div>
    </div>
  );
};

export const Tab: FC<TabProps> = ({ index, className, children }) => {
  return (
    <button
      type="button"
      data-index={index}
      x-on:click="tabButtonClicked($el)"
      className={cn(
        "relative z-20 inline-flex items-center justify-center w-full h-8 px-3",
        "text-sm font-medium transition-all rounded-md cursor-pointer whitespace-nowrap",
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent: FC<TabsContentProps> = ({
  index,
  className,
  children,
}) => {
  return (
    <div
      data-index={index}
      x-show="tabContentActive($el)"
      className={cn("relative w-full mt-2", className)}
      x-cloak
    >
      {children}
    </div>
  );
};
