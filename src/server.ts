import fastify from "fastify";
import cors from "@fastify/cors";

interface DriverParams{
    id: string
}
interface TeamsParams{
    id: string
}

const server = fastify({ logger: true });

server.register(cors, {
    origin: "*",
    methods: [ "GET" ]
});

const teams = [
    { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
    { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
    { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
    { id: 4, name: "Ferrari", base: "Maranello, Italy" },
    { id: 5, name: "Aston Martin", base: "Silverstone, United Kingdom" },
    { id: 6, name: "Alpine", base: "Enstone, United Kingdom" },
    { id: 7, name: "Williams", base: "Grove, United Kingdom" },
    { id: 8, name: "RB Formula One Team", base: "Faenza, Italy" },
    { id: 9, name: "Stake F1 Team Kick Sauber", base: "Hinwil, Switzerland" },
    { id: 10, name: "Haas F1 Team", base: "Kannapolis, United States" }
];

const drivers = [
    { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
    { id: 2, name: "Sergio Pérez", team: "Red Bull Racing" },
    { id: 3, name: "Lewis Hamilton", team: "Mercedes" },
    { id: 4, name: "George Russell", team: "Mercedes" },
    { id: 5, name: "Charles Leclerc", team: "Ferrari" },
    { id: 6, name: "Carlos Sainz", team: "Ferrari" },
    { id: 7, name: "Lando Norris", team: "McLaren" },
    { id: 8, name: "Oscar Piastri", team: "McLaren" },
    { id: 9, name: "Fernando Alonso", team: "Aston Martin" },
    { id: 10, name: "Lance Stroll", team: "Aston Martin" },
    { id: 11, name: "Pierre Gasly", team: "Alpine" },
    { id: 12, name: "Esteban Ocon", team: "Alpine" },
    { id: 13, name: "Alexander Albon", team: "Williams" },
    { id: 14, name: "Logan Sargeant", team: "Williams" },
    { id: 15, name: "Daniel Ricciardo", team: "RB Formula One Team" },
    { id: 16, name: "Yuki Tsunoda", team: "RB Formula One Team" },
    { id: 17, name: "Valtteri Bottas", team: "Stake F1 Team Kick Sauber" },
    { id: 18, name: "Guanyu Zhou", team: "Stake F1 Team Kick Sauber" },
    { id: 19, name: "Nico Hülkenberg", team: "Haas F1 Team" },
    { id: 20, name: "Kevin Magnussen", team: "Haas F1 Team" }
];

server.get("/teams", async (req, resp) => {
    resp.type("application/json").code(200);

    return teams;
});
server.get("/drivers", async(req, resp) => {
    resp.type("application/json").code(200);

    return drivers;
});

server.get<{Params: DriverParams}>("/drivers/:id", async(req, resp) => {
    const id = parseInt(req.params.id);
    const driver = drivers.find(driv => driv.id === id);

    if(!driver){
        resp.type("application/json").code(404);
        return { message: "Driver not Found" };
    } else {
        resp.type("application/json").code(200);
    }

    return driver;
});
server.get<{Params: TeamsParams}>("/teams/:id", async(req, resp) => {
    const id = parseInt(req.params.id);
    const team = teams.find(t => t.id === id);

    if(!team){
        resp.type("application/json").code(404);
        return { message: "Team not Found" };
    } else {
        resp.type("application/json").code(200);
    }

    return team;
});

server.listen({ port: Number(process.env.PORT) }, () => {
    console.log(`Server init on port ${process.env.PORT}`);
})