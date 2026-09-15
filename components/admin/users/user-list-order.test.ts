import { describe, expect, it } from "vitest";

import type { RoleSlug } from "@/lib/permissions/roles";

import { VISIBLE_USER_LIMIT, orderUsersForTable } from "./user-list-order";

function account(id: string, role: RoleSlug, createdAt: string) {
  return { id, role, createdAt };
}

function idsOf(users: readonly { id: string }[]) {
  return users.map((user) => user.id);
}

describe("orderUsersForTable", () => {
  it("puts the longest-standing super admin first, though rows arrive newest first", () => {
    const users = [
      account("third-super-admin", "super_admin", "2026-09-14T08:00:00Z"),
      account("new-learner", "learner", "2026-09-13T08:00:00Z"),
      account("second-super-admin", "super_admin", "2026-09-10T08:00:00Z"),
      account("first-super-admin", "super_admin", "2026-08-29T08:00:00Z"),
    ];

    expect(idsOf(orderUsersForTable(users))).toEqual([
      "first-super-admin",
      "second-super-admin",
      "third-super-admin",
      "new-learner",
    ]);
  });

  it("walks the team down the hierarchy before any learner", () => {
    const sameDay = "2026-09-01T00:00:00Z";
    const users = [
      account("learner", "learner", sameDay),
      account("writer", "writer", sameDay),
      account("teacher", "teacher", sameDay),
      account("admin", "admin", sameDay),
      account("head-admin", "head_admin", sameDay),
      account("super-admin", "super_admin", sameDay),
    ];

    expect(idsOf(orderUsersForTable(users))).toEqual([
      "super-admin",
      "head-admin",
      "admin",
      "teacher",
      "writer",
      "learner",
    ]);
  });

  it("keeps the oldest member first inside a team tier", () => {
    const users = [
      account("newer-teacher", "teacher", "2026-09-12T00:00:00Z"),
      account("older-teacher", "teacher", "2026-09-02T00:00:00Z"),
    ];

    expect(idsOf(orderUsersForTable(users))).toEqual([
      "older-teacher",
      "newer-teacher",
    ]);
  });

  it("lists learners newest sign-up first", () => {
    const users = [
      account("earliest", "learner", "2026-09-01T00:00:00Z"),
      account("latest", "learner", "2026-09-14T00:00:00Z"),
      account("middle", "learner", "2026-09-07T00:00:00Z"),
    ];

    expect(idsOf(orderUsersForTable(users))).toEqual([
      "latest",
      "middle",
      "earliest",
    ]);
  });

  it("leaves the array it was given alone", () => {
    const users = [
      account("learner", "learner", "2026-09-01T00:00:00Z"),
      account("admin", "admin", "2026-09-01T00:00:00Z"),
    ];

    orderUsersForTable(users);

    expect(idsOf(users)).toEqual(["learner", "admin"]);
  });
});

describe("the rows the table shows", () => {
  function visible<T extends { role: RoleSlug; createdAt: string }>(
    users: T[]
  ) {
    return orderUsersForTable(users).slice(0, VISIBLE_USER_LIMIT);
  }

  function learners(count: number) {
    return Array.from({ length: count }, (_, index) =>
      account(
        `learner-${index + 1}`,
        "learner",
        `2026-09-${String(index + 1).padStart(2, "0")}T00:00:00Z`
      )
    );
  }

  it("stops at a dozen", () => {
    expect(VISIBLE_USER_LIMIT).toBe(12);
    expect(visible(learners(30))).toHaveLength(12);
  });

  it("fills what the team leaves empty with the newest learners", () => {
    const team = [
      account("writer", "writer", "2026-09-05T00:00:00Z"),
      account("second-super-admin", "super_admin", "2026-09-10T00:00:00Z"),
      account("first-super-admin", "super_admin", "2026-08-29T00:00:00Z"),
    ];

    expect(idsOf(visible([...learners(20), ...team]))).toEqual([
      "first-super-admin",
      "second-super-admin",
      "writer",
      "learner-20",
      "learner-19",
      "learner-18",
      "learner-17",
      "learner-16",
      "learner-15",
      "learner-14",
      "learner-13",
      "learner-12",
    ]);
  });

  it("shows no learner once the team alone fills the table", () => {
    const team = Array.from({ length: 14 }, (_, index) =>
      account(`admin-${index + 1}`, "admin", "2026-09-01T00:00:00Z")
    );

    const rows = visible([...learners(5), ...team]);

    expect(rows).toHaveLength(12);
    expect(rows.every((user) => user.role !== "learner")).toBe(true);
  });
});
