<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  import { cn } from '$lib/utils';

  type ButtonVariant = 'default' | 'ghost' | 'outline' | 'secondary';
  type ButtonSize = 'default' | 'icon' | 'sm';

  type Props = HTMLButtonAttributes & {
    children?: Snippet;
    size?: ButtonSize;
    variant?: ButtonVariant;
  };

  let {
    class: className = '',
    disabled = false,
    size = 'default',
    type = 'button',
    variant = 'default',
    children,
    ...restProps
  }: Props = $props();

  const sizeClasses: Record<ButtonSize, string> = {
    default: 'h-9 px-4 py-2 text-sm',
    icon: 'size-8 px-0 text-xs',
    sm: 'h-8 px-3 text-xs',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    default: 'bg-primary text-primary-foreground hover:opacity-90',
    ghost: 'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-border bg-card text-foreground hover:bg-accent',
    secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
  };
</script>

<button
  {...restProps}
  {disabled}
  {type}
  class={cn(
    'inline-flex items-center justify-center rounded-md font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    sizeClasses[size],
    variantClasses[variant],
    className,
  )}
>
  {@render children?.()}
</button>
