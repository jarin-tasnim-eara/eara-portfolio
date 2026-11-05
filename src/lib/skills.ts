export type SkillItem = {
  id: string;
  name: string;
  category: string | null;
  icon: string | null;
  is_core: boolean | null;
};

export type SkillGroup = {
  name: string;
  slug: string;
  items: SkillItem[];
};

export function categorySlug(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug.length > 0 ? slug : "other";
}

export function groupSkills(skills: SkillItem[]): SkillGroup[] {
  const groups: SkillGroup[] = [];

  skills.forEach((skill) => {
    const groupName =
      skill.category && skill.category.length > 0 ? skill.category : "Other";
    const existing = groups.find((group) => group.name === groupName);

    if (existing) {
      existing.items.push(skill);
    } else {
      groups.push({
        name: groupName,
        slug: categorySlug(groupName),
        items: [skill],
      });
    }
  });

  return groups;
}