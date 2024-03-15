import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@kuldeepyeware/common-app";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
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

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  const authorId = c.get("userId");

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (error) {
    c.status(403);
    return c.text("Error Occured");
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (error) {
    c.status(403);
    return c.text("Error Occured");
  }
});

blogRouter.delete("/delete", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const authorId = c.get("userId");

  try {
    console.log(authorId);
    console.log(body.postId);
    if (authorId === body.authorId) {
      const post = await prisma.post.delete({
        where: {
          id: body.postId,
        },
      });
      return c.json({
        id: post.id,
      });
    } else {
      return c.json({
        message: "Not an Owner",
      });
    }
  } catch (error) {
    c.status(403);
    return c.text("Error Occured");
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        id: true,
        postedTime: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      posts,
    });
  } catch (error) {
    c.status(403);
    return c.text("Error Occured");
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = await c.req.param("id");

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        postedTime: true,
        content: true,
        authorId: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      post,
    });
  } catch (error) {
    c.status(403);
    return c.text("Error Occured");
  }
});
