type IconProps = {
  name: "sun" | "calendar" | "cake" | "tent" | "arrow" | "phone" | "mail" | "pin" | "instagram"
    | "snowflake" | "sprout" | "clock" | "people" | "clipboard" | "ticket";
  size?: number;
};
export function Icon({ name, size = 24 }: IconProps) {
  const paths = {
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
    cake: <><path d="M4 14h16v7H4zM4 17c2 0 2 1.5 4 1.5S10 17 12 17s2 1.5 4 1.5 2-1.5 4-1.5M7 14v-3h10v3M12 4v3"/><path d="M12 4c1-1 1-2 0-3-1 1-1 2 0 3Z"/></>,
    tent: <><path d="m3 21 9-18 9 18H3Z"/><path d="m12 3 3 18M12 3 9 21M7 21l5-7 5 7"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></>,
    snowflake: <path d="M12 2v20M3.34 7l17.32 10M3.34 17 20.66 7M9 4l3 3 3-3M9 20l3-3 3 3M3.57 10.6l4.1-1.1-1.1-4.1M17.43 18.6l-1.1-4.1 4.1-1.1M3.57 13.4l4.1 1.1-1.1 4.1M17.43 5.4l-1.1 4.1 4.1 1.1"/>,
    sprout: <><path d="M12 21v-9m-7 9h14M12 15C7 15 4 12 4 7c5 0 8 3 8 8Zm0-3c0-5 3-8 8-8 0 5-3 8-8 8Z"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></>,
    people: <><circle cx="9" cy="7" r="3"/><path d="M3 20v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2m2-15a3 3 0 0 1 0 6m1 3a4 4 0 0 1 3 4v2"/></>,
    clipboard: <><rect x="8" y="3" width="8" height="4" rx="1.5"/><path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2m-8 9 2.5 2.5L16 11"/></>,
    ticket: <path d="M4 6h16a1 1 0 0 1 1 1v2a3 3 0 0 0 0 6v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a3 3 0 0 0 0-6V7a1 1 0 0 1 1-1Zm10 3v.01m0 2.99v.01m0 2.99v.01"/>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
