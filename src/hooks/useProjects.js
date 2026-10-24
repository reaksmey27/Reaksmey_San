import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { PROJECTS } from "../data/projects";
import { compareProjectsByDate } from "../utils/projectSort";

export function mergeProjects(records) {
  const projects = new Map(
    PROJECTS.map((p, index) => [
      String(p.id),
      { ...p, id: String(p.id), order: index },
    ]),
  );
  for (const record of records) {
    const original = projects.get(record.id);
    if (record.deleted) projects.delete(record.id);
    else if (
      record.title &&
      Array.isArray(record.tech) &&
      Array.isArray(record.links)
    ) {
      projects.set(record.id, {
        ...record,
        image: record.image || original?.image || "",
      });
    }
  }
  return [...projects.values()].sort(compareProjectsByDate);
}

export function useProjects() {
  const [projects, setProjects] = useState(() => mergeProjects([]));
  const [loading, setLoading] = useState(Boolean(db));
  const [error, setError] = useState("");
  useEffect(() => {
    if (!db) return;
    return onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        setProjects(
          mergeProjects(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
          ),
        );
        setLoading(false);
        setError("");
      },
      () => {
        setLoading(false);
        setError(
          "Could not load Firebase projects. Check your connection and Firestore rules, then reload.",
        );
      },
    );
  }, []);
  return { projects, loading, error };
}
