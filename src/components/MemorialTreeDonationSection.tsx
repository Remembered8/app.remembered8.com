'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile, TreeDonation } from '@/types/memorial';
import { Trees, Plus } from 'lucide-react';

interface MemorialTreeDonationSectionProps {
  language?: Language;
  memorial: MemorialProfile;
  onAddDonation: (donation: TreeDonation) => void;
}

export const MemorialTreeDonationSection: React.FC<MemorialTreeDonationSectionProps> = ({
  memorial,
  onAddDonation,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [treeCount, setTreeCount] = useState(3);
  const [organization, setOrganization] = useState<TreeDonation['organization']>('One Tree Planted');
  const [donorMessage, setDonorMessage] = useState('');

  const defaultDonations: TreeDonation[] = memorial.treeDonations || [
    {
      id: 'tree-1',
      donorName: 'Friends of the Family Foundation',
      treesCount: 10,
      organization: 'One Tree Planted',
      message: 'Planted 10 native trees in lasting memory and celebration of a life well-lived.',
      donatedAt: '2024-02-10',
      certificateCode: 'OTP-MEMORIAL-881923',
    },
    {
      id: 'tree-2',
      donorName: 'The Heritage Fellowship',
      treesCount: 5,
      organization: 'National Forest Foundation',
      message: 'For enduring roots, clean canopy, and timeless remembrance.',
      donatedAt: '2024-01-02',
      certificateCode: 'NFF-2024-991',
    }
  ];

  const totalTrees = defaultDonations.reduce((acc, curr) => acc + curr.treesCount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) return;

    const newDonation: TreeDonation = {
      id: `tree-${Date.now()}`,
      donorName: donorName.trim(),
      treesCount: Number(treeCount),
      organization,
      message: donorMessage.trim() || `Memorial grove dedicated in honor of ${memorial.fullName}.`,
      donatedAt: new Date().toISOString().split('T')[0],
      certificateCode: `REM-GROVE-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    onAddDonation(newDonation);
    setIsModalOpen(false);
    setDonorName('');
    setDonorMessage('');
  };

  return (
    <section id="tree-donations" className="bg-[#F4F6F0] py-12 px-4 sm:px-6 lg:px-8 border-b-2 border-[#111111] text-[#111111]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#111111] pb-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.25em] text-emerald-800 font-bold mb-1">
              <Trees className="w-4 h-4 text-emerald-700" />
              <span>{t.sections.trees.sectionLabel}</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#111111]">{t.sections.trees.title}</h2>
            <p className="text-xs font-serif italic text-[#555555] mt-1">
              Roots that deepen, leaves that shelter &bull; {totalTrees} memorial trees planted in honor of {memorial.fullName}.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-mono uppercase tracking-wider transition shrink-0 font-bold shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.sections.trees.plant}</span>
          </button>
        </div>

        {/* Tree Donations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {defaultDonations.map((d) => (
            <div key={d.id} className="p-5 bg-white border border-[#111111]/30 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between border-b border-[#111111]/15 pb-2 mb-3">
                  <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold flex items-center gap-1">
                    <Trees className="w-3 h-3 text-emerald-600" />
                    {d.treesCount} Trees Planted
                  </span>
                  <span className="text-[10px] font-mono text-[#777777]">{d.donatedAt}</span>
                </div>

                <h4 className="font-serif font-bold text-sm text-[#111111]">{d.donorName}</h4>
                <p className="text-[11px] font-mono text-[#555555] mb-2">{d.organization}</p>
                <p className="text-xs font-serif italic text-[#444444] leading-relaxed">
                  &ldquo;{d.message}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#111111]/10 text-[9px] font-mono text-[#777777] mt-3 flex items-center justify-between">
                <span>Certificate: {d.certificateCode}</span>
                <span className="text-emerald-800 font-bold">{t.sections.trees.verified}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Donation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white text-[#111111] border-2 border-[#111111] max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#111111] pb-2">
                <h3 className="font-serif-display text-xl font-bold text-[#111111] flex items-center gap-2">
                  <Trees className="w-5 h-5 text-emerald-700" />
                  <span>Memorial Tree Grove for {memorial.fullName}</span>
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-xs font-mono cursor-pointer">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-mono uppercase text-[#666666] mb-1">{t.sections.trees.donorLabel}</label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder={t.sections.trees.donorPlaceholder}
                    className="w-full px-3 py-1.5 border border-[#111111]/30 font-serif"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono uppercase text-[#666666] mb-1">{t.sections.trees.countLabel}</label>
                    <select
                      value={treeCount}
                      onChange={(e) => setTreeCount(Number(e.target.value))}
                      className="w-full px-3 py-1.5 border border-[#111111]/30 font-mono bg-white"
                    >
                      <option value={1}>{t.sections.trees.count1}</option>
                      <option value={3}>{t.sections.trees.count3}</option>
                      <option value={5}>{t.sections.trees.count5}</option>
                      <option value={10}>{t.sections.trees.count10}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono uppercase text-[#666666] mb-1">{t.sections.trees.orgLabel}</label>
                    <select
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value as any)}
                      className="w-full px-3 py-1.5 border border-[#111111]/30 font-mono bg-white"
                    >
                      <option value="One Tree Planted">One Tree Planted</option>
                      <option value="National Forest Foundation">National Forest Foundation</option>
                      <option value="Arbor Day Foundation">Arbor Day Foundation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono uppercase text-[#666666] mb-1">{t.sections.trees.messageLabel}</label>
                  <textarea
                    rows={3}
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    placeholder={t.sections.trees.messagePlaceholder}
                    className="w-full px-3 py-1.5 border border-[#111111]/30 font-serif"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#777777]">{t.sections.trees.certificate}</span>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-900 hover:bg-emerald-950 text-white font-mono uppercase font-bold tracking-wider cursor-pointer"
                  >{t.sections.trees.confirm}</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
