import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function StepIndicator({
  steps = [],
  currentStep = 0,
  onStepClick = () => {},
  orientation = 'horizontal',
}) {
  return (
    <div className={cn(
      'flex',
      orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
      'gap-4'
    )}>
      {steps.map((step, idx) => {
        const isComplete = idx < currentStep;
        const isCurrent = idx === currentStep;
        const isDisabled = idx > currentStep;

        return (
          <motion.div
            key={idx}
            className={cn(
              'flex items-center',
              orientation === 'vertical' ? 'w-full' : 'gap-4'
            )}
          >
            {/* Step Circle */}
            <motion.button
              onClick={() => !isDisabled && onStepClick(idx)}
              disabled={isDisabled}
              whileHover={!isDisabled ? { scale: 1.1 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              className={cn(
                'relative flex-shrink-0 w-12 h-12 rounded-full font-semibold text-sm transition-all flex items-center justify-center',
                isComplete && 'bg-success text-white shadow-lg shadow-success/20',
                isCurrent && 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/20',
                isDisabled && 'bg-muted text-muted-foreground cursor-not-allowed opacity-50',
                !isDisabled && !isComplete && 'bg-card-bg border-2 border-card-border hover:border-primary/50 text-muted-foreground'
              )}
            >
              {isComplete ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                >
                  <Check size={20} />
                </motion.div>
              ) : (
                <span>{idx + 1}</span>
              )}
            </motion.button>

            {/* Step Label */}
            <div className={cn(
              'flex-1',
              orientation === 'vertical' ? 'ml-4' : ''
            )}>
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  'text-sm font-medium transition-colors',
                  isComplete && 'text-success',
                  isCurrent && 'text-primary',
                  isDisabled && 'text-muted-foreground'
                )}
              >
                {step.label}
              </motion.div>
              {step.description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground mt-1"
                >
                  {step.description}
                </motion.p>
              )}
            </div>

            {/* Connector */}
            {idx < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isComplete ? 1 : 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                origin={orientation === 'vertical' ? 'top' : 'left'}
                className={cn(
                  'flex-shrink-0 origin-left',
                  orientation === 'vertical'
                    ? 'w-0.5 h-12 ml-6 bg-gradient-to-b from-success/20 to-card-border'
                    : 'w-8 h-0.5 bg-gradient-to-r from-success/20 to-card-border'
                )}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
