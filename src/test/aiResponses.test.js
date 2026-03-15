import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAIResponse } from '../aiResponses.js';

describe('getAIResponse', () => {
  it('returns a date string for date questions in English', () => {
    const response = getAIResponse('What is today\'s date?', 'en');
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  it('returns a time string for time questions', () => {
    const response = getAIResponse('What is the time?', 'en');
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  it('returns health advice for health questions in English', () => {
    const response = getAIResponse('How to stay healthy?', 'en');
    expect(typeof response).toBe('string');
    expect(response.toLowerCase()).toMatch(/health|water|vegetabl|exercise|sleep|meal/i);
  });

  it('returns food advice for food questions', () => {
    const response = getAIResponse('What foods should I eat?', 'en');
    expect(typeof response).toBe('string');
    expect(response.toLowerCase()).toMatch(/food|dal|fruit|vegetabl|diet/i);
  });

  it('returns yoga information for yoga questions', () => {
    const response = getAIResponse('Tell me about yoga', 'en');
    expect(typeof response).toBe('string');
    expect(response.toLowerCase()).toMatch(/yoga/i);
  });

  it('returns diabetes information for diabetes questions', () => {
    const response = getAIResponse('I have diabetes', 'en');
    expect(typeof response).toBe('string');
    expect(response.toLowerCase()).toMatch(/diabet|sugar|blood|doctor/i);
  });

  it('returns sleep tips for sleep questions', () => {
    const response = getAIResponse('How to sleep better at night?', 'en');
    expect(typeof response).toBe('string');
    expect(response.toLowerCase()).toMatch(/sleep|bed|night/i);
  });

  it('returns smartphone help for phone questions', () => {
    const response = getAIResponse('How to use smartphone?', 'en');
    expect(typeof response).toBe('string');
    expect(response.toLowerCase()).toMatch(/phone|app|screen|call/i);
  });

  it('returns a default response for unknown questions', () => {
    const response = getAIResponse('xyzabc123 unknown query', 'en');
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  it('returns Hindi responses for health questions when lang is hi', () => {
    const response = getAIResponse('स्वस्थ कैसे रहें', 'hi');
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  it('falls back to English for unsupported language codes', () => {
    const response = getAIResponse('How to stay healthy?', 'xx');
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  it('returns AI information for AI-related questions', () => {
    const response = getAIResponse('What is AI?', 'en');
    expect(typeof response).toBe('string');
    expect(response.toLowerCase()).toMatch(/ai|artificial|intelligence|assistant/i);
  });

  it('returns exercise tips for exercise questions', () => {
    const response = getAIResponse('What exercises should I do?', 'en');
    expect(typeof response).toBe('string');
    expect(response.toLowerCase()).toMatch(/exercise|walk|yoga|stretch/i);
  });
});
