src/
├── config/                 # Configuration files
│   ├── database.ts        # Database configuration
│   ├── environment.ts     # Environment variables
│   └── logger.ts          # Logging configuration
│
├── controllers/           # Request handlers
│   ├── auth.controller.ts
│   └── user.controller.ts
│
├── middleware/           # Express middleware
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validation.middleware.ts
│
├── models/              # Database models/schemas
│   ├── user.model.ts
│   └── types/          # TypeScript interfaces and types
│       └── user.types.ts
│
├── routes/             # Express routes
│   ├── auth.routes.ts
│   └── user.routes.ts
│
├── services/           # Business logic
│   ├── auth.service.ts
│   └── user.service.ts
│
├── utils/             # Utility functions and helpers
│   ├── constants.ts
│   ├── helpers.ts
│   └── validators.ts
│
├── tests/            # Test files
│   ├── integration/
│   └── unit/
│
├── app.ts           # Express app setup
└── server.ts        # Server entry point

# Additional root-level files
.env                # Environment variables
.gitignore          # Git ignore file
package.json        # Project dependencies and scripts
tsconfig.json       # TypeScript configuration
jest.config.js      # Jest test configuration
.eslintrc          # ESLint configuration
.prettierrc        # Prettier configuration