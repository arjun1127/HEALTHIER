# HEALTHIER
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

```
mkdir life-os && cd life-os
npm init -y

# backend dependencies
npm install express mongoose bcryptjs jsonwebtoken dotenv cors

# dev
npm install -D nodemon
```