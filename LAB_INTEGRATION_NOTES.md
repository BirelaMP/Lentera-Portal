# LENTERA Lab integration

This merge keeps the Supabase/session backend and AI Tutor logging from the existing portal while integrating the Raspberry Pi/Lab work.

Integrated from Lab branch:
- 5x5 ArUco grid UI and live circuit diagram
- Raspberry Pi WebSocket + MJPEG observer backend
- auto-calibration/grid mapper
- Lab navigation links

Intentionally NOT copied from the Lab ZIP:
- app/api/auth/login/route.ts
- the old localStorage-only dashboard auth logic
- duplicate Vite frontend/
