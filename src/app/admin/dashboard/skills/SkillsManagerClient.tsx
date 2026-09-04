"use client";

import React, { useState } from "react";
import { Trash2, Plus, ArrowUp, ArrowDown, Edit2, Check, X, Layers, Cpu } from "lucide-react";
import { addSkill, updateSkill, deleteSkill, moveSkill } from "../actions/skills";

interface SkillItem {
  id: string;
  name: string;
  category: string | null;
  order: number;
}

interface SkillsManagerClientProps {
  initialSkills: SkillItem[];
}

const COMMON_CATEGORIES = ["Framework", "Library", "Database", "Backend", "Language", "AI", "Design", "Tool"];

export default function SkillsManagerClient({ initialSkills }: SkillsManagerClientProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const startEdit = (skill: SkillItem) => {
    setEditingId(skill.id);
    setEditName(skill.name);
    setEditCategory(skill.category || "General");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditCategory("");
  };

  return (
    <div className="space-y-6">
      {/* Add New Skill Form */}
      <div className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Plus size={18} className="text-amber-500" />
          <span>Add New Skill / Tool</span>
        </h2>

        <form action={addSkill} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input 
              name="name" 
              required 
              placeholder="Skill name (e.g. Next.js, PyTorch, Docker)" 
              className="px-4 py-2.5 rounded-xl bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all text-sm"
            />
            <input 
              name="category" 
              placeholder="Category (e.g. Framework, AI, Database)" 
              list="category-suggestions"
              className="px-4 py-2.5 rounded-xl bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all text-sm"
            />
            <datalist id="category-suggestions">
              {COMMON_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-gray-500 font-mono">Suggestions:</span>
              {COMMON_CATEGORIES.slice(0, 5).map((cat) => (
                <span 
                  key={cat} 
                  className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-gray-400 font-mono border border-white/5"
                >
                  {cat}
                </span>
              ))}
            </div>

            <button 
              type="submit" 
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-black font-bold flex items-center gap-2 hover:bg-amber-600 transition-all cursor-pointer text-sm shadow-md shadow-amber-500/10"
            >
              <Plus size={16} />
              Add Skill
            </button>
          </div>
        </form>
      </div>

      {/* Skills List with Inline Editing & Reordering */}
      <div className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Cpu size={18} className="text-amber-500" />
            <span>Active Skills &amp; Stack ({initialSkills.length})</span>
          </h2>
          <span className="text-xs text-gray-500 font-mono">Use arrows to adjust order</span>
        </div>

        <div className="space-y-2.5">
          {initialSkills.length === 0 ? (
            <p className="text-center text-gray-500 py-10 font-mono text-sm">No skills added yet.</p>
          ) : (
            initialSkills.map((skill, index) => {
              const isEditing = editingId === skill.id;

              if (isEditing) {
                return (
                  <form
                    key={skill.id}
                    action={async (formData: FormData) => {
                      await updateSkill(skill.id, formData);
                      setEditingId(null);
                    }}
                    className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/40 flex flex-col sm:flex-row items-center gap-3 transition-all"
                  >
                    <input
                      name="name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                      placeholder="Skill name"
                      className="flex-1 w-full px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-white/20 text-white text-sm outline-none focus:border-amber-500 font-medium"
                    />
                    <input
                      name="category"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      placeholder="Category"
                      list="category-suggestions"
                      className="w-full sm:w-48 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-white/20 text-white text-sm outline-none focus:border-amber-500"
                    />
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-bold text-xs flex items-center gap-1 hover:bg-amber-600 transition-all cursor-pointer"
                      >
                        <Check size={14} />
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </form>
                );
              }

              return (
                <div 
                  key={skill.id} 
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#1a1a1a] border border-white/5 group hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-0.5">
                      <form action={async () => { await moveSkill(skill.id, "up"); }}>
                        <button 
                          type="submit"
                          disabled={index === 0}
                          className="p-0.5 text-gray-600 hover:text-white disabled:opacity-20 cursor-pointer"
                          aria-label="Move Up"
                        >
                          <ArrowUp size={14} />
                        </button>
                      </form>
                      <form action={async () => { await moveSkill(skill.id, "down"); }}>
                        <button 
                          type="submit"
                          disabled={index === initialSkills.length - 1}
                          className="p-0.5 text-gray-600 hover:text-white disabled:opacity-20 cursor-pointer"
                          aria-label="Move Down"
                        >
                          <ArrowDown size={14} />
                        </button>
                      </form>
                    </div>

                    <div>
                      <p className="font-semibold text-white text-sm">{skill.name}</p>
                      {skill.category && (
                        <span className="text-[11px] font-mono text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                          {skill.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(skill)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 size={12} />
                      Edit
                    </button>

                    <form action={async () => {
                      await deleteSkill(skill.id);
                    }}>
                      <button 
                        type="submit"
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
                        aria-label="Delete Skill"
                      >
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
