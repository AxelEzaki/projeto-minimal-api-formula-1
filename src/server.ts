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
    { id: 2, name: "Lewis Hamilton", team: "Ferrari" },
    { id: 3, name: "Lando Norris", team: "McLaren" },
]

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