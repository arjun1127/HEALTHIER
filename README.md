# HEALTHIER

## General summary

HEALTHIER is a personal health and lifestyle assistant that captures user inputs (images, text, forms) and combines them into dashboards for food, expenses, sleep, activity, and productivity.
It uses AI (vision, LLMs and ML models) to classify food, estimate calories, generate personalized suggestions and plans, detect patterns, and provide predictions and reminders.
The system is built as a web app: a React frontend that talks over HTTPS to a Node/Express API gateway, which coordinates services (auth, data, AI orchestration), background workers and persistent stores to deliver insights, summaries, and scheduled tasks.

## Technical summary 

### Goal of the project 

Frontend & API layer

UI: React + Tailwind (Vite) renders dashboards (Food, Expenses, Sleep, Activity, Productivity) and collects user inputs (images, text, forms).
API Gateway: Node.js + Express exposes HTTP endpoints and routes requests to backend modules and the AI orchestrator; handles request validation, auth checks, and orchestration entry points.
Core backend modules and responsibilities

Auth Service: JWT/OAuth based auth and user/session management.
Data Service: CRUD endpoints backed by MongoDB for primary domain data (users, food entries, expenses, sleep/activity logs).
Domain modules: Food, Expense, Activity/Sleep modules implement domain-specific ingestion, classification pipelines and scoring logic; each delegates heavy AI tasks to the orchestrator.
AI Orchestrator and model layers

The AI Orchestrator is the central coordinator for AI work it chooses models, builds prompts, validates JSON responses, plans multi-step LLM tasks, calls vision/ML/embedding services, and enqueues background jobs when needed.
Engines:
LLM Engine: reasoning, suggestions, planning, RAG (retrieval-augmented generation) for personalized plans and insights.
Vision Model: food detection and calorie estimation from images.
Prediction Engine: ML models (LSTM, regression, clustering) for sleep/budget predictions and habit scoring.
Embedding Generator + Vector DB: embeddings stored in Chroma for similarity search, habit/notes retrieval and RAG contexts.
Asynchronous processing & scaling

Job Queue: BullMQ backed by Redis handles async tasks (LLM plans, ML batch inference, scheduled daily tasks).
Workers: dedicated worker processes run ML inference, generate PDFs/reports, send reminders, and assemble summaries from queued jobs.
Storage and persistence

MongoDB: primary document store for users, domain records (food, expenses, sleep).
Vector DB (Chroma): stores embeddings for fast semantic search and RAG.
Object storage (S3-compatible): stores images, PDFs, and generated reports.
Data flow and example request lifecycle

Example (food image): frontend uploads an image → API forwards to AI Orchestrator → orchestrator sends to Vision Model → vision returns detected items/calories → orchestrator creates or enriches a food record in MongoDB, generates embeddings and stores them in Chroma if needed, then enqueues a worker job to update dashboards and send any notifications or plans via a worker.

## HIGH-LEVEL SYSTEM ARCHITECTURE

```

                          ┌─────────────────────────┐
                          │        Frontend         │
                          │ React + Tailwind (UI)   │
                          │                         │
User Inputs  ───────────► │ Dashboards: Food,       │
(Image/Text/Forms)        │ Expenses, Sleep,        │
                          │ Activity, Productivity  │
                          └──────────┬──────────────┘
                                     │ HTTPS
                                     ▼
                          ┌─────────────────────────┐
                          │        API Gateway      │
                          │   Node.js / Express     │
                          └──────────┬──────────────┘
                                     │
        ┌────────────────────────────┼───────────────────────────────┐
        │                            │                               │
        ▼                            ▼                               ▼
┌──────────────────┐      ┌────────────────────┐        ┌──────────────────────┐
│  Auth Service     │      │  Data Service       │        │   AI Orchestrator    │
│  JWT / OAuth      │      │ CRUD (MongoDB)     │        │ LLM + ML + Vision    │
└──────────────────┘      └────────────────────┘        └──────────────────────┘
                                                         │
                                                         │ Calls multiple subsystems:
                                                         ▼
                          ┌─────────────────────────────────────────────────────┐
                          │             AI Engines & Models                     │
                          │                                                     │
                          │ 1. LLM Reasoner     → Insights, plans, suggestions │
                          │ 2. Vision Model     → Food detection, calories     │
                          │ 3. ML Models        → Predictions (sleep, budget)  │
                          │ 4. Embeddings       → Habits/notes vector search   │
                          └─────────────────────────────────────────────────────┘

                                     │
                                     ▼
                        ┌──────────────────────────────┐
                        │         Job Queue             │
                        │      BullMQ / Redis           │
                        │ Async tasks, daily tasks,     │
                        │ LLM plans, ML batch jobs      │
                        └──────────────────────────────┘
                                     │
                                     ▼
                         ┌─────────────────────────────┐
                         │         Workers              │
                         │ ML inference, PDFs,          │
                         │ reminders, summaries         │
                         └─────────────────────────────┘

                                     │
                                     ▼
        ┌────────────────────────────┼───────────────────────────────────────────┐
        │                            │                                          │
        ▼                            ▼                                          ▼
┌─────────────────┐      ┌─────────────────────┐                      ┌───────────────────────┐
│   MongoDB        │      │   Vector DB (Chroma)│                      │ Object Storage (S3)   │
│ Users, Food,     │      │ Habits, notes,      │                      │ Images, PDFs, reports │
│ Expenses, Sleep  │      │ embeddings, history │                      └───────────────────────┘
└─────────────────┘      └─────────────────────┘

```

## BACKEND INTERNAL ARCHITECTURE

```
                                   ┌──────────────────────┐
                                   │    Express API       │
                                   └───────────┬──────────┘
                                               │
                       ┌───────────────────────┼──────────────────────────┐
                       ▼                       ▼                          ▼
           ┌──────────────────┐     ┌──────────────────────┐   ┌────────────────────────┐
           │   Food Module     │     │  Expense Module       │   │ Activity/Sleep Module  │
           │ Upload → classify │     │ SMS/UPI → classify    │   │ Time logs → scoring    │
           └──────────┬───────┘     └────────────┬──────────┘   └──────────┬────────────┘
                      │                          │                         │
                      ▼                          ▼                         ▼
                 ┌────────────────────────────────────────────────────────────────────────┐
                 │                       AI ORCHESTRATOR                                │
                 │   Decides which models to use, builds prompts, validates JSON,        │
                 │   creates task plans, calls ML & Vision models, sends jobs to queue.   │
                 └──────────────────┬────────────────────────────────┬────────────────────┘
                                    │                                │
                                    ▼                                ▼
                    ┌──────────────────────────┐         ┌─────────────────────────┐
                    │      LLM Engine          │         │  Prediction Engine       │
                    │ Reasoning, suggestions,  │         │ ML models (LSTM,         │
                    │ insights, plans, RAG     │         │ Regression, Clustering)  │
                    └──────────┬───────────────┘         └──────────────┬───────────┘
                               │                                          │
                               ▼                                          ▼
                    ┌─────────────────────────────┐       ┌───────────────────────────┐
                    │      Vision Model            │       │   Embedding Generator     │
                    │ Food classification, calories│       │ Notes habits → vectors    │
                    └─────────────────────────────┘       └──────────────┬────────────┘
                                                                          │
                                                                          ▼
                                                        ┌────────────────────────────┐
                                                        │    Vector DB (Chroma)     │
                                                        │ Similarity search, RAG    │
                                                        └────────────────────────────┘

```

## Setup 
### Backend 

```
git clone https://github.com/arjun1127/HEALTHIER
cd life-os
npm init -y

# backend dependencies
npm install

# dev
npm install -D nodemon
```
### Frontend 
```
cd UI-os/my-app
npm install

```

