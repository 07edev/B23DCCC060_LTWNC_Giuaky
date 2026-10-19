import { act, renderHook } from '@testing-library/react'
import { useDebounce } from './useDebounce'
test('updates after delay', () => { jest.useFakeTimers(); const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), { initialProps: { value: 'a' } }); rerender({ value: 'b' }); expect(result.current).toBe('a'); act(() => jest.advanceTimersByTime(300)); expect(result.current).toBe('b'); jest.useRealTimers() })
