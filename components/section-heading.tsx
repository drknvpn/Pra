import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  index: string
  title: string
  className?: string
}

export function SectionHeading({
  index,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-8 flex items-end gap-4 md:mb-12', className)}>
      <span className="font-mono text-xs tracking-widest text-primary md:text-sm">
        {index}
      </span>
      <div className="h-px flex-1 translate-y-[-6px] bg-border" />
      <h2 className="heading text-4xl font-bold sm:text-5xl md:text-6xl">
        {title}
      </h2>
    </div>
  )
}
