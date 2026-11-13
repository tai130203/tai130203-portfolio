import { useEffect, useState } from 'react';

const format = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' });

/** The current time in Ho Chi Minh City, so a visitor knows when a reply is likely. */
export default function LocalTime() {
  const [time, setTime] = useState(() => format.format(new Date()));

  useEffect(() => {
    const timer = setInterval(() => setTime(format.format(new Date())), 20000);
    return () => clearInterval(timer);
  }, []);

  return <time>{time} · GMT+7</time>;
}
