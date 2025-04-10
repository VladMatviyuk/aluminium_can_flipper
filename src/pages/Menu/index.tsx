import Logo from '@/components/Logo';
import { InfinityFlip } from '@/components/InfinityFlip';
import { Navigation } from '@/components/Navigation';

export const Menu = () => {
  return (
    <main>
      <InfinityFlip/>

      <Logo/>

      <Navigation/>
    </main>
  )
}