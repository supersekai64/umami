import {
  Row,
  Sidebar,
  SidebarHeader,
  SidebarItem,
  type SidebarProps,
  SidebarSection,
  ThemeButton,
} from '@umami/react-zen';
import Link from 'next/link';
import { useGlobalState, useMessages, useNavigation } from '@/components/hooks';
import { Globe, PanelLeft } from '@/components/icons';
import { LanguageButton } from '@/components/input/LanguageButton';
import { NavButton } from '@/components/input/NavButton';
import { PanelButton } from '@/components/input/PanelButton';
import { Logo } from '@/components/svg';

export function SideNav(props: SidebarProps) {
  const { formatMessage, labels } = useMessages();
  const { pathname, renderUrl } = useNavigation();
  const [isCollapsed, setIsCollapsed] = useGlobalState('sidenav-collapsed');

  const hasNav = !!(pathname.startsWith('/admin') || pathname.includes('/settings') || pathname.includes('/websites/'));

  const links = [
    {
      id: 'websites',
      label: formatMessage(labels.websites),
      path: '/websites',
      icon: <Globe />,
    },
  ];

  return (
    <Sidebar {...props} isCollapsed={isCollapsed || hasNav} backgroundColor>
      <SidebarSection onClick={() => setIsCollapsed(false)}>
        <SidebarHeader
          label="umami"
          icon={isCollapsed && !hasNav ? <PanelLeft /> : <Logo />}
          style={{ maxHeight: 40 }}
        >
          {!isCollapsed && !hasNav && <PanelButton />}
        </SidebarHeader>
      </SidebarSection>
      <SidebarSection paddingTop="0" paddingBottom="0" justifyContent="center">
        <NavButton showText={!hasNav && !isCollapsed} />
      </SidebarSection>
      <SidebarSection flexGrow={1}>
        {links.map(({ id, path, label, icon }) => {
          return (
            <Link key={id} href={renderUrl(path, false)} role="button">
              <SidebarItem
                label={label}
                icon={icon}
                isSelected={pathname.includes(path)}
                role="button"
              />
            </Link>
          );
        })}
      </SidebarSection>
      <SidebarSection justifyContent="flex-start">
        <Row wrap="wrap">
          <LanguageButton />
          <ThemeButton />
        </Row>
      </SidebarSection>
    </Sidebar>
  );
}
