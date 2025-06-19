# MyMUN

**MyMUN** is an interactive simulation game developed for our Object-Oriented Programming course. Participants encounter realistic United Nations–style scenarios about global challenges. Each player represents a country and makes policy decisions based on economic, social, and diplomatic priorities, earning points for their choices.

The primary goal of the game is to deepen strategic thinking skills, improve group communication, and practice negotiation by experiencing the complexities of global issues. MyMUN is designed to be flexible and extensible, catering to both newcomers and experienced simulation participants.

---

## 🚀 Features

- 🎮 **Scenario-Based Debates** – Discuss real-world problems and develop strategies as a team.
- 📝 **Policy Options** – Evaluate different policy paths and see their impacts.
- 🌍 **Country Representation** – Each player acts as a delegate for a specific country.
- 📊 **Score Tracking** – Economic, welfare, and diplomatic balances directly affect your points.
- ⚙️ **Flexible Architecture** – Easily add new scenarios or policy options.

---

## 🛠️ Technologies

### Backend

- Java 21
- Spring Boot 3.4.4
- Maven

### Frontend

- React 19
- Vite
- Axios
- React Hooks & Context API

---

## 🏗️ Architecture

The project follows a three-layered architecture that separates responsibilities clearly, making the codebase easy to maintain and extend:

| Layer          | Responsibilities                                                                                                                  |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Model**      | Defines game data structures (Player, WorldProblem, ProblemOption, StartGameRequest).                                             |
| **Service**    | Contains business logic: session management (GameService), problem selection (ProblemService), policy assignment (PolicyService). |
| **Controller** | Exposes REST API endpoints and routes incoming HTTP requests to the service layer.                                                |

```
Client ↔ Controller ↔ Service ↔ Repository/Model
```

Build tools (Maven for backend, npm & Vite for frontend) simplify project packaging and execution.

---

## 📦 Project Structure

```plaintext
mymun-backend/
├─ src/main/java/...        # Java code: models, services, controllers
└─ pom.xml                  # Maven configuration

mymun-frontend/
├─ src/                     # React components and pages
├─ public/                  # Static assets
└─ package.json             # NPM dependencies and scripts
```

---

## ⚙️ Installation & Running

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/MyMUN.git
   ```
2. **Backend**:
   ```bash
   cd MyMUN/mymun-backend
   mvn clean spring-boot:run
   ```
3. **Frontend**:
   ```bash
   cd MyMUN/mymun-frontend
   npm install    # or yarn
   npm run dev    # or yarn dev
   ```
4. Open your browser at `http://localhost:3000`.

---

## 🧩 API Endpoints

| Method | Endpoint                          | Description                                                                               |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------- |
| POST   | `/api/game/start`                 | Starts a new game session, assigns players and a random problem, and returns a `gameId`.  |
| GET    | `/api/game/problem/next/{gameId}` | Assigns a new random problem for the given game ID and returns it along with its options. |
| GET    | `/api/game/players/{gameId}`      | Retrieves the list of players for the specified game ID.                                  |
| PUT    | `/api/game/info/{gameId}`         | Updates the scores of a specified country's player based on economic and welfare effects. |
| GET    | `/api/game/info/{gameId}`         | Returns the current game state, including economy/welfare scores and assigned policies.   |



