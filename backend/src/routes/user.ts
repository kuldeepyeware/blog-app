import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@kuldeepyeware/common-app";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.use("/details", async (c, next) => {
  try {
    console.log("Reached");
    const jwt = c.req.header("Authorization");
    if (!jwt) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    const token = jwt.split(" ")[1];
    if (!token) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    c.set("userId", payload.id);
    await next();
  } catch (error) {
    c.status(403);
    return c.text("Error Occured in Middleware");
  }
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      jwt,
    });
  } catch (error) {
    c.status(403);
    return c.text("Error Occured");
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    c.status(403);
    return c.text("Error Occured");
  }
});

userRouter.get("/auth", async (c) => {
  try {
    const jwt = c.req.header("Authorization");
    if (!jwt) {
      return c.json({ status: false });
    }
    const token = jwt.split(" ")[1];
    if (!token) {
      return c.json({ status: false });
    }
    if (token === null) {
      return c.json({ status: false });
    }
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      return c.json({ status: false });
    }
    if (!payload.id) {
      return c.json({ status: false });
    }
    return c.json({ status: true });
  } catch (error) {
    c.status(403);
    return c.json({
      status: false,
    });
  }
});

userRouter.get("/details", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });
    return c.json({
      name: user?.name,
      email: user?.email,
      id: user?.id,
    });
  } catch (error) {
    c.status(403);
    return c.text("Error Occured");
  }
});
