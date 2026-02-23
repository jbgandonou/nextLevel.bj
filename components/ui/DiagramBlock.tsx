import React from 'react';
import { View, Text, ScrollView, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Fonts } from '@/constants/Colors';

// Characters used in box-drawing
const BOX_CHARS = /[┌┐└┘├┤┬┴┼─│╔╗╚╝║═╠╣╦╩╬╭╮╯╰┃━┆┇┊┋╌╍╎╏]/;
const ARROW_CHARS = /[→←↑↓⬆⬇⬅➡▶◀▲▼]/;
const DASH_ARROW = /(?:--|->|<--|=>|<=|-->|<-->)/;
const ANNOTATION = /←[^←\n]+$/;

/** Detect whether a code-block string is likely an ASCII art diagram */
export function isDiagram(content: string): boolean {
  const lines = content.split('\n');
  let boxCount = 0;
  let arrowCount = 0;
  for (const line of lines) {
    if (BOX_CHARS.test(line)) boxCount++;
    if (ARROW_CHARS.test(line) || DASH_ARROW.test(line)) arrowCount++;
  }
  // If >=20% of lines contain box chars or arrows it's a diagram
  return (boxCount + arrowCount) / Math.max(lines.length, 1) >= 0.15;
}

/** Detect diagram type for header label */
function detectDiagramType(content: string): { label: string; icon: React.ComponentProps<typeof FontAwesome>['name'] } {
  const lower = content.toLowerCase();
  if (lower.includes('internet') || lower.includes('réseau') || lower.includes('fw') || lower.includes('dmz') || lower.includes('pare-feu') || lower.includes('firewall'))
    return { label: 'Architecture Réseau', icon: 'sitemap' };
  if (lower.includes('client') && (lower.includes('serveur') || lower.includes('server')))
    return { label: 'Diagramme de séquence', icon: 'exchange' };
  if (lower.includes('req') && lower.includes('rep'))
    return { label: 'Protocole', icon: 'exchange' };
  if (/[├└]/.test(content) && /──/.test(content) && !/┌/.test(content))
    return { label: 'Arbre', icon: 'code-fork' };
  if (lower.includes('couche') || lower.includes('layer'))
    return { label: 'Architecture en couches', icon: 'bars' };
  if (lower.includes('pipeline') || lower.includes('ci/cd') || lower.includes('build'))
    return { label: 'Pipeline', icon: 'random' };
  if (lower.includes('flux') || lower.includes('flow') || lower.includes('étape'))
    return { label: 'Diagramme de flux', icon: 'long-arrow-right' };
  return { label: 'Diagramme', icon: 'object-group' };
}

interface DiagramBlockProps {
  content: string;
  accentColor: string;
  isDark: boolean;
}

/** Colorize a single line of ASCII art */
function ColorizedLine({ line, accentColor, isDark }: { line: string; accentColor: string; isDark: boolean }) {
  // Split the line into segments of different types
  const segments: { text: string; type: 'box' | 'arrow' | 'annotation' | 'text' | 'keyword' }[] = [];
  let i = 0;

  // Check for trailing annotation (← comment)
  let mainPart = line;
  let annotation = '';
  const annoMatch = line.match(/(←.*)$/);
  if (annoMatch) {
    mainPart = line.slice(0, annoMatch.index);
    annotation = annoMatch[1];
  }

  let current = '';
  let currentType: 'box' | 'arrow' | 'text' = 'text';

  for (const ch of mainPart) {
    if (BOX_CHARS.test(ch)) {
      if (currentType !== 'box' && current) {
        segments.push({ text: current, type: currentType });
        current = '';
      }
      currentType = 'box';
      current += ch;
    } else if (ARROW_CHARS.test(ch)) {
      if (currentType !== 'arrow' && current) {
        segments.push({ text: current, type: currentType });
        current = '';
      }
      currentType = 'arrow';
      current += ch;
    } else {
      if (currentType !== 'text' && current) {
        segments.push({ text: current, type: currentType });
        current = '';
      }
      currentType = 'text';
      current += ch;
    }
  }
  if (current) segments.push({ text: current, type: currentType });
  if (annotation) segments.push({ text: annotation, type: 'annotation' });

  // Color mapping
  const boxColor = accentColor;
  const arrowColor = isDark ? '#F39C12' : '#E67E22';
  const textColor = isDark ? '#e6edf3' : '#1F2937';
  const annotationColor = isDark ? '#7ee787' : '#2ECC71';
  const dashArrowColor = isDark ? '#FFA657' : '#D97706';

  return (
    <Text style={diagramStyles.line}>
      {segments.map((seg, idx) => {
        // For text segments, also colorize dash arrows like --->
        if (seg.type === 'text') {
          const parts = seg.text.split(/((?:--+>|<--+|--|->|<-|=>|<=|<-->))/g);
          return parts.map((part, pidx) => {
            if (DASH_ARROW.test(part) || /^--+>$/.test(part) || /^<--+$/.test(part)) {
              return <Text key={`${idx}-${pidx}`} style={[diagramStyles.char, { color: dashArrowColor }]}>{part}</Text>;
            }
            // Check for [bracketed text] - render as keyword/component
            const bracketParts = part.split(/(\[[^\]]+\])/g);
            if (bracketParts.length > 1) {
              return bracketParts.map((bp, bpidx) => {
                if (/^\[.+\]$/.test(bp)) {
                  return <Text key={`${idx}-${pidx}-${bpidx}`} style={[diagramStyles.char, { color: isDark ? '#D2A8FF' : '#8B5CF6' }]}>{bp}</Text>;
                }
                return <Text key={`${idx}-${pidx}-${bpidx}`} style={[diagramStyles.char, { color: textColor }]}>{bp}</Text>;
              });
            }
            return <Text key={`${idx}-${pidx}`} style={[diagramStyles.char, { color: textColor }]}>{part}</Text>;
          });
        }
        if (seg.type === 'box') {
          return <Text key={idx} style={[diagramStyles.char, { color: boxColor }]}>{seg.text}</Text>;
        }
        if (seg.type === 'arrow') {
          return <Text key={idx} style={[diagramStyles.char, { color: arrowColor }]}>{seg.text}</Text>;
        }
        if (seg.type === 'annotation') {
          return <Text key={idx} style={[diagramStyles.char, { color: annotationColor, fontStyle: 'italic' }]}>{seg.text}</Text>;
        }
        return <Text key={idx} style={[diagramStyles.char, { color: textColor }]}>{seg.text}</Text>;
      })}
    </Text>
  );
}

export default function DiagramBlock({ content, accentColor, isDark }: DiagramBlockProps) {
  let cleaned = content;
  if (cleaned.endsWith('\n')) cleaned = cleaned.slice(0, -1);
  const lines = cleaned.split('\n');

  const { label, icon } = detectDiagramType(content);

  const canvasBg = isDark ? '#0d1117' : '#1a1b26';
  const headerBg1 = accentColor;
  const headerBg2 = accentColor + 'BB';

  return (
    <View style={[diagramStyles.container, {
      borderColor: isDark ? '#2d333b' : '#E2E8F0',
    }]}>
      {/* Header bar */}
      <LinearGradient
        colors={[headerBg1, headerBg2] as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={diagramStyles.header}>
        <FontAwesome name={icon} size={13} color="#fff" />
        <Text style={diagramStyles.headerText}>{label}</Text>
      </LinearGradient>

      {/* Canvas */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[diagramStyles.canvas, { backgroundColor: canvasBg }]}>
          {lines.map((line, i) => (
            <ColorizedLine key={i} line={line} accentColor={accentColor} isDark={true} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom subtle gradient */}
      <LinearGradient
        colors={[accentColor + '08', accentColor + '00'] as [string, string]}
        style={diagramStyles.bottomGlow}
      />
    </View>
  );
}

const diagramStyles = StyleSheet.create({
  container: {
    marginVertical: 14,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  headerText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: Fonts.bold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  canvas: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    minWidth: '100%',
  },
  line: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 11.5,
    lineHeight: 18,
  },
  char: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 11.5,
    lineHeight: 18,
  },
  bottomGlow: {
    height: 3,
  },
});
