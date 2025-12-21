# Botaqiy Edge Functions Documentation

This document describes all Supabase Edge Functions used in the Botaqiy application.

---

## 1. extract-text

**Purpose:** Extracts and preprocesses text from user input for flashcard generation.

**Endpoint:** `POST /functions/v1/extract-text`

**Authentication:** Required (JWT)

**Request Body:**
```json
{
  "text": "string - Raw text input from user"
}
```

**Response:**
```json
{
  "extractedText": "string - Cleaned and preprocessed text",
  "wordCount": "number - Total word count",
  "chunks": ["array - Text split into meaningful chunks"]
}
```

**Errors:**
- `400` - Invalid input (empty text)
- `401` - Unauthorized
- `500` - Processing error

---

## 2. generate-flashcards

**Purpose:** Generates flashcards from extracted text using AI.

**Endpoint:** `POST /functions/v1/generate-flashcards`

**Authentication:** Required (JWT)

**Request Body:**
```json
{
  "text": "string - Text to generate flashcards from",
  "count": "number - Number of flashcards to generate (1-50)"
}
```

**Response:**
```json
{
  "flashcards": [
    {
      "front": "string - Question/term",
      "back": "string - Answer/definition",
      "difficulty": "string - easy|medium|hard"
    }
  ],
  "title": "string - Suggested session title"
}
```

**Errors:**
- `400` - Invalid input
- `401` - Unauthorized
- `429` - Rate limit exceeded
- `500` - AI generation error

---

## 3. generate-scenario

**Purpose:** Generates a scenario test based on flashcard content.

**Endpoint:** `POST /functions/v1/generate-scenario`

**Authentication:** Required (JWT)

**Request Body:**
```json
{
  "flashcards": [
    {
      "front": "string",
      "back": "string"
    }
  ],
  "difficulty": "string - easy|medium|hard"
}
```

**Response:**
```json
{
  "title": "string - Scenario title",
  "description": "string - Scenario context",
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "number - Index of correct option (0-3)"
    }
  ]
}
```

**Errors:**
- `400` - Invalid input
- `401` - Unauthorized
- `429` - Rate limit exceeded
- `500` - AI generation error

---

## 4. calculate-score

**Purpose:** Calculates and records user score after completing a scenario test.

**Endpoint:** `POST /functions/v1/calculate-score`

**Authentication:** Required (JWT)

**Request Body:**
```json
{
  "scenarioId": "string - UUID or rule-based scenario ID",
  "difficulty": "string - easy|medium|hard",
  "correctAnswers": "number - Count of correct answers",
  "totalQuestions": "number - Total questions in test",
  "userId": "string - User UUID"
}
```

**Response:**
```json
{
  "points": "number - Points earned",
  "newCoins": "number - Updated coin balance",
  "newLevel": "number - Updated level",
  "accuracy": "number - Percentage accuracy (0-100)"
}
```

**Score Calculation:**
- Easy: Base 10 points × accuracy
- Medium: Base 20 points × accuracy  
- Hard: Base 30 points × accuracy

**Errors:**
- `400` - Invalid input
- `401` - Unauthorized
- `500` - Database error

---

## 5. purchase-reward

**Purpose:** Processes reward purchases and deducts coins from user balance.

**Endpoint:** `POST /functions/v1/purchase-reward`

**Authentication:** Required (JWT)

**Request Body:**
```json
{
  "userId": "string - User UUID",
  "rewardId": "string - Reward identifier",
  "rewardName": "string - Display name",
  "rewardType": "string - avatar|badge|hint|slot",
  "cost": "number - Coin cost"
}
```

**Response (Success):**
```json
{
  "success": true,
  "newCoins": "number - Updated coin balance",
  "message": "string - Success message"
}
```

**Response (Insufficient Coins):**
```json
{
  "success": false,
  "error": "Insufficient coins",
  "currentCoins": "number",
  "required": "number"
}
```

**Errors:**
- `400` - Insufficient coins
- `401` - Unauthorized
- `500` - Transaction error

---

## Frontend Integration Examples

### Calling Edge Functions

```typescript
import { supabase } from "@/integrations/supabase/client";

// Generate flashcards
const { data, error } = await supabase.functions.invoke('generate-flashcards', {
  body: { text: userText, count: 10 }
});

// Purchase reward
const { data, error } = await supabase.functions.invoke('purchase-reward', {
  body: {
    userId: user.id,
    rewardId: 'golden-avatar',
    rewardName: 'Golden Avatar',
    rewardType: 'avatar',
    cost: 500
  }
});
```

### Error Handling

```typescript
try {
  const { data, error } = await supabase.functions.invoke('calculate-score', {
    body: scoreData
  });

  if (error) {
    if (error.message.includes('429')) {
      toast({ title: 'Rate limited', description: 'Please try again later' });
    } else {
      throw error;
    }
  }

  // Handle success
  toast({ title: 'Score recorded!', description: `Earned ${data.points} points` });
} catch (err) {
  console.error('Edge function error:', err);
  toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' });
}
```

---

## Environment Variables

All edge functions have access to these environment variables:

- `SUPABASE_URL` - Project URL
- `SUPABASE_ANON_KEY` - Anonymous key (for client operations)
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (for admin operations)
- `LOVABLE_API_KEY` - AI gateway key (for AI-powered functions)

---

## Security Notes

1. All functions require JWT authentication (verify_jwt = true)
2. User IDs are validated against the authenticated user
3. Service role key is used only for trusted operations
4. Rate limiting is applied to AI-powered endpoints
5. Input validation is performed before processing
