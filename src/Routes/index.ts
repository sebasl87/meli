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
    console.log(item)
    /**Call to Meli List */
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${item}`
    );
    /**Author data */
    const datos = {
      author: {
        name: "Sebastian",
        lastname: "Loguzzo",
      },
    };
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
        state: it.address.state_name
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

    /** Call to Meli item full detail */
    const responseDetail = await fetch(`https://api.mercadolibre.com/items/${id}`);
    /** Call to Meli item description */
    const responseDescription = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
    /**Convert String to JSON */
    const data = await responseDetail.json();
    const description = await responseDescription.json();
    /**Author data */
    const datos = {
      author: {
        name: "Sebastian",
        lastname: "Loguzzo",
      },
    };
    /**Pattern */
    const item = {
      id: data.id,
      title: data.title,
      price: {
        currency: data.currency_id,
        amount: data.price,
      },
      picture: data.pictures[0].url,
      condition: data.condition,
      free_shipping: data.shipping.free_shipping,
      sold_quantity: data.sold_quantity,
      description: description.plain_text
    };

    /**Total result */
    const listDetails = {
      ...datos,
      item
    };

    res.json(listDetails);
  }
  routes(): void {
    this.router.get("", this.Consulta);
    this.router.get("/:id", this.Detalle);
  }
}

const api = new Api();
api.routes();

export default api.router;
