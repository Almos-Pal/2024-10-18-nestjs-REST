import { Body, Controller, Delete, Get, NotFoundException, Param, Put, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ReplaceProductDTO } from './product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

#products = [
  {
    id: 1,
    name: "Product 1",
    price: 100
  },
  {
    id: 2,
    name: "Product 2",
    price: 200
  },
  {
    id: 3,
    name: "Product 3",
    price: 300
  }
]

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get("products")
  listProducts() {
    return this.#products;
  }

  @Get("products/:id")
  getProduct(@Param("id") id: string) {
    console.log(typeof id);
    return this.#products[id];
  }

  @Delete("products/:id")
  deleteProduct(@Param("id") id: string) {
    if(this.#products[id] === undefined) {
      throw new NotFoundException("No product found with this id");
    }
    
    this.#products.splice(Number(id)-1, 1);
  }
  
  @Put("products/:id")
  replaceProduct(@Param("id") id: string, @Body() product: ReplaceProductDTO) {
    if(this.#products[id] === undefined) {
      throw new NotFoundException("No product found with this id");
    }
    this.#products[id] = product;
    
  }
}
