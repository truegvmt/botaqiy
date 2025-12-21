import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  avatar?: string;
  className?: string;
}

export function ChatBubble({ message, isUser = false, avatar, className }: ChatBubbleProps) {
  return (
    <div className={cn(
      "flex gap-3 items-start",
      isUser ? "flex-row-reverse" : "flex-row",
      className
    )}>
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0",
        isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
      )}>
        {avatar || (isUser ? "👤" : "🤖")}
      </div>
      <div className={cn(
        "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
        isUser 
          ? "bg-primary text-primary-foreground rounded-tr-sm" 
          : "bg-card border border-border rounded-tl-sm"
      )}>
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

interface ChatContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ChatContainer({ children, className }: ChatContainerProps) {
  return (
    <div className={cn(
      "bg-secondary/30 rounded-xl p-4 space-y-4 max-h-[300px] overflow-y-auto",
      className
    )}>
      {children}
    </div>
  );
}
