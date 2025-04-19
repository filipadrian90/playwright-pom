
# 🎭 Playwright POM Framework

An advanced UI test automation framework using [Playwright](https://playwright.dev/) with TypeScript, built using the Page Object Model design pattern and enhanced logging.

## 🚀 Features

- ✅ Page Object Model (POM)
- ✅ TypeScript support
- ✅ Color-coded logging to console and per-test log files
- ✅ Log cleanup before each run
- ✅ HTML reports with attached logs per test
- ✅ Cross-browser testing support (Chromium, Firefox, etc.)

---

## 🧰 Tech Stack

- [Playwright Test](https://playwright.dev/docs/test-intro)
- TypeScript
- Chalk (for console log coloring)
- Custom logger utility
- HTML Reporter (Playwright built-in)

---

## 📁 Folder Structure

```
.
├── pages/               # Page Object classes
├── tests/               # Test specs
├── utils/               # Custom logger and hooks
├── logs/                # Auto-generated per-test log files
├── test-results/        # Raw test results from Playwright
├── playwright-report/   # HTML report output
├── playwright.config.ts # Playwright configuration
```

---

## ⚙️ Setup Instructions

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install
# (or run npm run setup if using custom setup script)

# 3. Run tests
npm test

# 4. View HTML report
npm run report
```

---

## 📄 Scripts in `package.json`

```json
"scripts": {
  "test": "npx playwright test",
  "report": "npx playwright show-report",
  "setup": "npx playwright install"
}
```

---

## 👤 Author

**Adrian Filip**  
ISTQB Test Manager | QA Automation | Backend Developer

> 🧠 *“The greatest failure is not trying at all.”*

---

## 📌 Notes

- This project logs results into `logs/<browser>/<test>.log`
- Logs are automatically attached to Playwright’s HTML report
- Logs are cleaned up before each test run (via `globalSetup.ts`)

---

Happy testing! 🧪
