import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AnalogClockWidget from '../components/widgets/AnalogClockWidget';
import MusicWidget from '../components/widgets/MusicWidget';
import WeatherWidget from '../components/widgets/WeatherWidget';
import CalendarWidget from '../components/widgets/CalendarWidget';
import WidgetsContainer from '../components/widgets/WidgetsContainer';

describe('Phase 7: Desktop Widgets Suite', () => {
  describe('Task 7.1: Analog Clock Widget', () => {
    it('renders the dial with 60 ticks and date/timezone labels', () => {
      // 10:10:30 on Oct 22, 2026
      const testDate = new Date(2026, 9, 22, 10, 10, 30);
      const { container } = render(<AnalogClockWidget staticDate={testDate} />);

      expect(screen.getByTestId('analog-clock-widget')).toBeTruthy();
      expect(screen.getByText('Oct 22')).toBeTruthy();
      expect(screen.getByText('India (IST)')).toBeTruthy();

      // Check perimeter ticks
      const tickLines = container.querySelectorAll('line');
      // 60 perimeter ticks + 1 hour hand + 1 minute hand + 1 second hand = 63 lines
      expect(tickLines.length).toBe(63);
    });

    it('calculates correct hand rotations for given time', () => {
      // 3:00:00 -> hr: 90 deg, min: 0 deg, sec: 0 deg
      const testDate = new Date(2026, 9, 22, 3, 0, 0);
      const { container } = render(<AnalogClockWidget staticDate={testDate} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();

      // Hour hand transform
      const hourHand = container.querySelector('line[stroke-width="5"]');
      expect(hourHand?.getAttribute('transform')).toBe('rotate(90 100 100)');

      // Minute hand transform
      const minHand = container.querySelector('line[stroke-width="3.8"]');
      expect(minHand?.getAttribute('transform')).toBe('rotate(0 100 100)');

      // Second hand group transform
      const secGroup = container.querySelector('g');
      expect(secGroup?.getAttribute('transform')).toBe('rotate(0 100 100)');
    });
  });

  describe('Task 7.2: Spotify Music Widget', () => {
    it('renders Spotify badge, default Peaceful Lofi track and controls', () => {
      render(<MusicWidget />);

      expect(screen.getByTestId('music-widget')).toBeTruthy();
      expect(screen.getByText('SPOTIFY MUSIC')).toBeTruthy();
      expect(screen.getByTestId('music-track-title').textContent).toBe('Peaceful Lofi');
      expect(screen.getByTestId('music-track-artist').textContent).toBe('Calm Study');
      expect(screen.getByTestId('music-play-btn').getAttribute('aria-label')).toBe('Play');
    });

    it('toggles play/pause state when play button is clicked', () => {
      render(<MusicWidget />);

      const playBtn = screen.getByTestId('music-play-btn');
      expect(playBtn.getAttribute('aria-label')).toBe('Play');

      fireEvent.click(playBtn);
      expect(playBtn.getAttribute('aria-label')).toBe('Pause');

      fireEvent.click(playBtn);
      expect(playBtn.getAttribute('aria-label')).toBe('Play');
    });

    it('cycles tracks on next and previous button clicks', () => {
      render(<MusicWidget />);

      const nextBtn = screen.getByTestId('music-next-btn');
      const prevBtn = screen.getByTestId('music-prev-btn');

      // Next track -> Sunset Waves
      fireEvent.click(nextBtn);
      expect(screen.getByTestId('music-track-title').textContent).toBe('Sunset Waves');

      // Next track -> Tokyo Midnight
      fireEvent.click(nextBtn);
      expect(screen.getByTestId('music-track-title').textContent).toBe('Tokyo Midnight');

      // Prev track -> Sunset Waves
      fireEvent.click(prevBtn);
      expect(screen.getByTestId('music-track-title').textContent).toBe('Sunset Waves');
    });
  });

  describe('Task 7.3: Weather Widget', () => {
    it('renders initial city Chennai with 25° and glowing sun', () => {
      render(<WeatherWidget />);

      expect(screen.getByTestId('weather-widget')).toBeTruthy();
      expect(screen.getByTestId('weather-city-name').textContent).toBe('CHENNAI');
      expect(screen.getByTestId('weather-temp').textContent).toBe('25°');
      expect(screen.getByTestId('weather-condition').textContent).toBe('Clear Day');
      expect(screen.getByTestId('weather-highlow').textContent).toBe('H:29° L:24°');
      expect(screen.getByTestId('weather-sun-icon')).toBeTruthy();
    });

    it('toggles to next city (New Delhi matching weather.png) on click', () => {
      render(<WeatherWidget />);

      const weatherWidget = screen.getByTestId('weather-widget');
      fireEvent.click(weatherWidget);

      expect(screen.getByTestId('weather-city-name').textContent).toBe('NEW DELHI');
      expect(screen.getByTestId('weather-temp').textContent).toBe('29°');
      expect(screen.getByTestId('weather-condition').textContent).toBe('Clear');
      expect(screen.getByTestId('weather-highlow').textContent).toBe('H:41° L:27°');
    });
  });

  describe('Task 7.4: Calendar Widget', () => {
    it('renders October header, weekdays, and day 22 circular highlight', () => {
      // October 22, 2026
      render(<CalendarWidget initialDate={new Date(2026, 9, 22)} />);

      expect(screen.getByTestId('calendar-widget')).toBeTruthy();
      expect(screen.getByTestId('calendar-month-name').textContent).toBe('October');
      expect(screen.getByTestId('calendar-today-highlight').textContent).toBe('22');
    });

    it('navigates to next month and previous month', () => {
      render(<CalendarWidget initialDate={new Date(2026, 9, 22)} />);

      const nextBtn = screen.getByTestId('calendar-next-month');
      const prevBtn = screen.getByTestId('calendar-prev-month');

      // Next month -> November
      fireEvent.click(nextBtn);
      expect(screen.getByTestId('calendar-month-name').textContent).toBe('November');

      // Prev month -> October
      fireEvent.click(prevBtn);
      expect(screen.getByTestId('calendar-month-name').textContent).toBe('October');
    });
  });

  describe('Task 7.5: Widgets Container Layout', () => {
    it('mounts all 4 widgets in the desktop widgets container', () => {
      render(<WidgetsContainer />);

      expect(screen.getByTestId('widgets-container')).toBeTruthy();
      expect(screen.getByTestId('analog-clock-widget')).toBeTruthy();
      expect(screen.getByTestId('music-widget')).toBeTruthy();
      expect(screen.getByTestId('weather-widget')).toBeTruthy();
      expect(screen.getByTestId('calendar-widget')).toBeTruthy();
    });
  });
});
