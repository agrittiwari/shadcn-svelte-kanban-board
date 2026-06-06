<script lang="ts">
  import type { Snippet } from 'svelte';

  import { cn } from '$lib/utils';

  type Props = {
    class?: string;
    children?: Snippet;
    variant?: 'default' | 'outline';
  };

  let { class: className = '', children, variant = 'default' }: Props = $props();

  const variantClasses = {
    default: 'bg-secondary text-secondary-foreground',
    outline: 'border border-border bg-transparent text-muted-foreground',
  };
</script>

<span
  class={cn(
    'inline-flex min-w-6 items-center justify-center rounded-full px-2 py-1 text-[11px] font-semibold',
    variantClasses[variant],
    className,
  )}
>
  {@render children?.()}
</span>
