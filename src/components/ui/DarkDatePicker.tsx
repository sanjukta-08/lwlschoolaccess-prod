import * as React from 'react';
import { format, parse, isValid } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface DarkDatePickerProps {
  value: string;
  onChange: (iso: string) => void;
  placeholder?: string;
  className?: string;
  fromYear?: number;
  toYear?: number;
  maxDate?: Date;
  disabled?: boolean;
}

export function DarkDatePicker({
  value,
  onChange,
  placeholder = 'Select a date',
  className,
  fromYear = 1950,
  toYear = new Date().getFullYear(),
  maxDate = new Date(),
  disabled,
}: DarkDatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const date = React.useMemo(() => {
    if (!value) return undefined;
    const parsed = parse(value, 'yyyy-MM-dd', new Date());
    return isValid(parsed) ? parsed : undefined;
  }, [value]);

  const display = date ? format(date, 'd MMM yyyy') : '';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            'h-10 w-full justify-start rounded-md border bg-background px-3 text-left text-sm font-normal text-foreground hover:bg-muted hover:text-foreground',
            'border-border focus:border-primary focus:ring-1 focus:ring-primary/20',
            !date && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-primary/70" />
          {display || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto border-border bg-popover p-0 text-foreground shadow-2xl"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (d) {
              onChange(format(d, 'yyyy-MM-dd'));
              setOpen(false);
            } else {
              onChange('');
            }
          }}
          defaultMonth={date || new Date(toYear, 0, 1)}
          fromYear={fromYear}
          toYear={toYear}
          disabled={(d) => d > maxDate || d < new Date(fromYear, 0, 1)}
          initialFocus
          className={cn('p-3 pointer-events-auto')}
        />
      </PopoverContent>
    </Popover>
  );
}
