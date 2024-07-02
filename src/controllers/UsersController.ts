import { Request, Response } from "express";
import { XMLBuilder } from "@/utils/XMLBuilder";

const users: User[] = [
  { id: "654245014", name: "Tannatee" },
  { id: "654245016", name: "Pakaphong" },
  { id: "654245019", name: "Supakorn" },
  { id: "654245031", name: "Bunyarit" },
  { id: "654245035", name: "Petcharat" },
  { id: "654245040", name: "Setthawut" },
  { id: "654245043", name: "Arnuphap" },
];

export function UserController() {
  return {
    async getUsers(req: Request, res: Response): Promise<void> {
      const response = new XMLBuilder().build({
        Users: {
          User: [...users],
        },
      });

      res.setHeader("Content-Type", "text/xml");
      res.status(200).send(response);

      return;
    },

    async getUser(req: Request, res: Response): Promise<void> {
      const { id } = req.params;

      const user = users.filter((user) => user.id == id)[0];
      const response = new XMLBuilder().build({
        Users: {
          User: user,
        },
      });

      res.setHeader("Content-Type", "text/xml");
      if (!user) {
        const err = new XMLBuilder().build({
          Error: { Message: "No users found" },
        });
        res.status(400).send(err);

        return;
      }

      res.status(200).send(response);

      return;
    },

    async setUser(req: Request, res: Response): Promise<void> {
      const {
        User: { Id, Name },
      } = req.body;

      users.push({ id: Id, name: Name });

      const response = new XMLBuilder().build({
        Users: {
          User: [...users],
        },
      });

      res.setHeader("Content-Type", "text/xml");
      res.status(200).send(response);

      return;
    },

    async deleteUser(req: Request, res: Response): Promise<void> {
      const { id } = req.body;

      const usersFiltered = users.filter((user) => user.id !== id);
      const response = new XMLBuilder().build({
        Users: {
          User: [...usersFiltered],
        },
      });

      res.setHeader("Content-Type", "text/xml");
      res.status(200).send(response);

      return;
    },
  };
}
