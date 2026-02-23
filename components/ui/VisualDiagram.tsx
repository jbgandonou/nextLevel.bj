import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Fonts } from '@/constants/Colors';

/**
 * VisualDiagram — Mobile-first vertical diagram renderer
 * All diagrams flow top-to-bottom for optimal mobile readability.
 *
 * Usage in markdown: ```diagram\n{ JSON }\n```
 */

export interface DiagramStep {
  /** Label/title of the step */
  label: string;
  /** Optional subtitle/detail */
  detail?: string;
  /** Background color */
  bg?: string;
  /** Text color */
  color?: string;
  /** Icon name (FontAwesome) */
  icon?: string;
}

export interface DiagramSection {
  /** Section title */
  title: string;
  /** Title color */
  titleColor?: string;
  /** Section background */
  bg?: string;
  /** Border color */
  borderColor?: string;
  /** Dashed border */
  dashed?: boolean;
  /** Steps inside this section */
  steps: DiagramStep[];
  /** Show step numbers */
  numbered?: boolean;
}

export interface DiagramData {
  /** Diagram title */
  title?: string;
  /** Title color */
  titleColor?: string;
  /** Background */
  bg?: string;
  /** Border */
  borderColor?: string;
  /** Sections — rendered top to bottom with arrows between */
  sections: DiagramSection[];
  /** Arrow label between sections */
  arrowLabel?: string;
  /** Footer note */
  note?: string;
}

interface Props {
  data: DiagramData;
  isDark: boolean;
}

function StepItem({ step, index, numbered, isDark }: { step: DiagramStep; index: number; numbered?: boolean; isDark: boolean }) {
  const bgColor = step.bg || (isDark ? '#1c212840' : '#f8fafc');
  const textColor = step.color || (isDark ? '#e0e0e0' : '#1a1a2e');

  return (
    <View style={[ds.step, { backgroundColor: bgColor }]}>
      {numbered && (
        <View style={[ds.stepNumber, { backgroundColor: textColor + '20' }]}>
          <Text style={[ds.stepNumberText, { color: textColor }]}>{index + 1}</Text>
        </View>
      )}
      <View style={ds.stepContent}>
        <Text style={[ds.stepLabel, { color: textColor }]}>{step.label}</Text>
        {step.detail && (
          <Text style={[ds.stepDetail, { color: textColor + 'AA' }]}>{step.detail}</Text>
        )}
      </View>
    </View>
  );
}

function ArrowDown({ label, color }: { label?: string; color: string }) {
  return (
    <View style={ds.arrowContainer}>
      <View style={[ds.arrowLine, { backgroundColor: color }]} />
      <Text style={[ds.arrowHead, { color }]}>{'\u25BC'}</Text>
      {label && <Text style={[ds.arrowLabel, { color }]}>{label}</Text>}
    </View>
  );
}

function SectionCard({ section, isDark }: { section: DiagramSection; isDark: boolean }) {
  const borderColor = section.borderColor || section.titleColor || (isDark ? '#30363d' : '#d0d7de');
  const bgColor = section.bg || (isDark ? '#161b2260' : '#ffffff60');
  const titleColor = section.titleColor || borderColor;

  return (
    <View style={[ds.section, {
      backgroundColor: bgColor,
      borderColor: borderColor,
      borderStyle: section.dashed ? 'dashed' : 'solid',
    }]}>
      <View style={[ds.sectionHeader, { borderBottomColor: borderColor + '40' }]}>
        <View style={[ds.sectionDot, { backgroundColor: titleColor }]} />
        <Text style={[ds.sectionTitle, { color: titleColor }]}>{section.title}</Text>
      </View>
      <View style={ds.stepsContainer}>
        {section.steps.map((step, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <View style={ds.miniArrow}>
                <View style={[ds.miniArrowLine, { backgroundColor: borderColor + '50' }]} />
                <Text style={{ color: borderColor + '70', fontSize: 8 }}>{'\u25BC'}</Text>
              </View>
            )}
            <StepItem step={step} index={i} numbered={section.numbered} isDark={isDark} />
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

export default function VisualDiagram({ data, isDark }: Props) {
  const rootBg = data.bg || (isDark ? '#0d1117' : '#f0f4f8');
  const borderColor = data.borderColor || (isDark ? '#30363d' : '#cbd5e1');
  const titleColor = data.titleColor || (isDark ? '#e0e0e0' : '#1a1a2e');
  const arrowColor = data.titleColor || (isDark ? '#6BB5FF' : '#4A90D9');

  return (
    <View style={[ds.root, { backgroundColor: rootBg, borderColor }]}>
      {data.title && (
        <Text style={[ds.title, { color: titleColor }]}>{data.title}</Text>
      )}

      {data.sections.map((section, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ArrowDown label={data.arrowLabel} color={arrowColor} />}
          <SectionCard section={section} isDark={isDark} />
        </React.Fragment>
      ))}

      {data.note && (
        <Text style={[ds.note, { color: isDark ? '#888' : '#666' }]}>{data.note}</Text>
      )}
    </View>
  );
}

const ds = StyleSheet.create({
  root: {
    marginVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.extraBold,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  // Sections
  section: {
    borderWidth: 1.5,
    borderRadius: 14,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    letterSpacing: 0.3,
  },
  stepsContainer: {
    padding: 12,
    gap: 0,
  },
  // Steps
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 10,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 11,
    fontFamily: Fonts.extraBold,
  },
  stepContent: {
    flex: 1,
  },
  stepLabel: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    lineHeight: 18,
  },
  stepDetail: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    marginTop: 2,
    lineHeight: 16,
  },
  // Arrows
  arrowContainer: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  arrowLine: {
    width: 2,
    height: 16,
    borderRadius: 1,
  },
  arrowHead: {
    fontSize: 10,
    marginTop: -2,
  },
  arrowLabel: {
    fontSize: 10,
    fontFamily: Fonts.semiBold,
    marginTop: 2,
    letterSpacing: 0.3,
  },
  // Mini arrows between steps
  miniArrow: {
    alignItems: 'center',
    paddingVertical: 2,
  },
  miniArrowLine: {
    width: 1.5,
    height: 8,
    borderRadius: 1,
  },
  // Note
  note: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 16,
  },
});
