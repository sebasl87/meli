import { Request, Response, Router } from "express";

const fetch = require("node-fetch");
const _ = require("underscore");

class Api {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async Consulta(req: Request, res: Response) {
    const item = req.query.q;

    /**Author data */
    const datos = {
      author: {
        name: "Sebastian",
        lastname: "Loguzzo",
      },
    };
    /**Call to Meli List */
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${item}`
    );
    /**Convert String to JSON */
    const data = await response.json();
    /**Categories */
    const categories = _.pluck(data.available_filters[0].values, "name");
    /**Top 4 */
    const result = data.results.slice(0, 4);
    /**Pattern */
    const items = _.map(result, function (it: any) {
      const item = {
        id: it.id,
        title: it.title,
        price: {
          currency: it.currency_id,
          amount: it.price,
        },
        picture: it.thumbnail,
        condition: it.condition,
        free_shipping: it.shipping.free_shipping,
      };
      return item;
    });

    /**Total result */
    const listItems = {
      ...datos,
      categories,
      items,
    };

    res.json(listItems);
  }

  public async Detalle(req: Request, res: Response) {
    const { id } = req.params;

    /** Call to Meli Items */
    const response = await fetch(
      `https://api.mercadolibre.com/items/${id}`
    );
    /**Convert to JSON to give pattern */
    const data = await response.json();

    res.json(data);
  }
  routes(): void {
    this.router.get("/api/items", this.Consulta);
    this.router.get("/api/items/:id", this.Detalle);
  }
}

const api = new Api();
api.routes();

export default api.router;
