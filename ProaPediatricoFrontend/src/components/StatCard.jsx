import { cn } from "../lib/utils";
import { motion as MotionComponent } from "framer-motion";



const variantStyles = {
  default: "border-border",
  success: "border-l-4 border-l-success border-t-0 border-r-0 border-b-0",
  warning: "border-l-4 border-l-warning border-t-0 border-r-0 border-b-0",
  critical: "border-l-4 border-l-destructive border-t-0 border-r-0 border-b-0",
};

const iconVariants = {
  default: "bg-muted text-muted-foreground",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  critical: "bg-destructive/10 text-destructive",
};

const StatCard = ({ title, value, subtitle, icon: IconComponent, trend, variant = "default" }) => {
  // Referenciamos las variables explícitamente para que el linter las marque como usadas
  const _Motion = MotionComponent;
  const _Icon = IconComponent;

  return (
    <_Motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("glass-card rounded-xl p-5", variantStyles[variant])}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {trend && (
            <p className={cn(
              "text-xs font-medium", 
              trend.value >= 0 ? "text-success" : "text-destructive"
            )}>
              {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        {_Icon && (
          <div className={cn("p-2.5 rounded-lg", iconVariants[variant])}>
            <_Icon className="w-5 h-5" />
          </div>
        )}

      </div>
    </_Motion.div>
  );
};

export default StatCard;