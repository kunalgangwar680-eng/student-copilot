# Student Copilot

**Problem Statement 4 – Open Innovation (Student Pain Points)**

Student Copilot is an AI-powered placement preparation assistant built for
college students preparing for internships and campus placements.

It helps students identify their biggest preparation gaps, understand their
placement readiness, convert those gaps into a focused 7-day action plan, and
get practical guidance through an AI Coach.

---

## What it does

Student Copilot solves a common student preparation problem:

Students often know that they need to prepare for placements, but they do not
know what to prioritize, what is holding them back, or what action they should
take next.

The platform provides:

- Student problem capture
- AI placement-readiness analysis
- Priority gap identification
- Personalized 7-day action plan
- AI placement coach
- Task completion and progress tracking
- Student research/evidence collection

**Problem Statement:** 4 – Open Innovation (Student Pain Points)

---

## Done / Left / Plan

### Done

- Dashboard
- Student problem input flow
- AI analysis screen
- Placement-readiness scoring interface
- Priority gap recommendations
- Personalized 7-day action plan
- Task completion tracking
- AI Coach chat interface
- Progress dashboard
- Student evidence collection interface
- AI fallback responses when API access is unavailable
- Mobile-friendly responsive layouts
- AI transparency notice

### Left

- Collect and document real student survey/interview evidence
- Final repository cleanup
- Final README evidence summary
- Public deployment
- Final mobile and accessibility checks
- Final presentation and demo rehearsal

### Plan

1. Validate the solution with real students.
2. Add the verified evidence to the repository.
3. Deploy the application publicly.
4. Test the complete student journey on desktop and mobile.
5. Finalize the presentation and live demo.

---

## Problem Definition

### Who has the problem?

College students preparing for internships and placements.

### What is the problem?

Students often face multiple preparation challenges at the same time:

- Unclear preparation priorities
- Weak technical consistency
- Difficulty improving projects
- Resume uncertainty
- Interview preparation gaps
- Too many disconnected resources

The result is that students spend time preparing without a clear understanding
of what they should focus on next.

### Why existing tools fall short

Students commonly use different tools for resumes, coding practice,
interview preparation, videos, notes and career advice.

These tools can help with individual activities, but the preparation journey is
often fragmented. Student Copilot combines diagnosis, prioritization, action
planning, coaching and progress tracking into one preparation workflow.

---

## Solution

Student Copilot follows a simple loop:

**Identify → Analyze → Prioritize → Act → Coach → Track**

### 1. Identify

The student describes their main placement-preparation problem.

### 2. Analyze

Student Copilot generates a placement-readiness view and highlights priority
gaps.

### 3. Prioritize

The most important preparation areas are surfaced instead of giving the
student a generic checklist.

### 4. Act

The student receives a focused 7-day action plan.

### 5. Coach

The AI Coach helps the student with preparation questions, interview practice,
resume improvement and technical preparation.

### 6. Track

Completed tasks are reflected in the Progress screen.

---

## How Student Copilot is different

Student Copilot is not designed as another standalone resume builder,
coding platform or interview question bank.

Its core idea is a connected preparation journey:

**Problem → AI Analysis → Action Plan → AI Coach → Progress**

This gives students a clear next action instead of forcing them to decide
what to do across multiple disconnected resources.

---

## Architecture and why

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- App Router

### Backend

Next.js API routes are used for server-side AI requests.

### AI

Student Copilot uses an AI model through a server-side API route.

The AI is used for:

- Placement-readiness analysis
- Priority gap generation
- Personalized coaching
- Practical preparation guidance

### Data storage

The prototype currently uses browser local storage for:

- Student profile
- 7-day action plan
- Completed tasks
- Student evidence entries

This keeps the prototype lightweight and avoids collecting unnecessary
personal data.

### Why this architecture?

Next.js provides a single application for the interface and server-side API
routes, making the prototype fast to build and easy to deploy.

Browser local storage is sufficient for the current prototype because the
primary goal is demonstrating the student preparation workflow.

---

## What we added

### Personalized 7-Day Plan

Instead of only showing AI advice, Student Copilot turns preparation gaps into
small daily actions.

### AI Coach

Students can ask for practical preparation guidance and interview practice
inside the same product.

### Progress Loop

Completed actions are tracked so the student can see progress rather than
receiving one-time advice.

### Student Evidence

The product includes a dedicated research interface for recording real student
feedback and validating the problem.

---

## How to run it

### Requirements

- Node.js
- npm

### Install

```bash
npm install