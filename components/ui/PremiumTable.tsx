import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@/constants/Colors';

interface PremiumTableProps {
  headers: string[];
  rows: string[][];
  accentColor: string;
  isDark: boolean;
}

/**
 * Premium table component with proper column sizing, alignment, and styling.
 * Features:
 * - Auto-sized columns based on content length
 * - Gradient header with white text
 * - Alternating row colors
 * - Bold first column (usually labels)
 * - Vertical cell separators
 * - Horizontal scroll for wide tables
 * - Shadow and rounded corners
 */
export default function PremiumTable({ headers, rows, accentColor, isDark }: PremiumTableProps) {
  // Calculate column widths based on content
  const colWidths = headers.map((header, colIdx) => {
    const headerLen = header.replace(/\*\*/g, '').length;
    const maxContentLen = rows.reduce((max, row) => {
      const cell = (row[colIdx] || '').replace(/\*\*/g, '');
      return Math.max(max, cell.length);
    }, 0);
    const maxLen = Math.max(headerLen, maxContentLen);

    // Scale: short labels ~90px, medium ~130px, long descriptions ~200px+
    if (maxLen <= 8) return 80;
    if (maxLen <= 15) return 110;
    if (maxLen <= 25) return 140;
    if (maxLen <= 40) return 170;
    return 210;
  });

  const totalWidth = colWidths.reduce((sum, w) => sum + w, 0);
  const minTableWidth = Math.max(totalWidth, 340);

  const headerBg1 = accentColor;
  const headerBg2 = accentColor + 'CC';
  const rowBg = isDark ? '#161b22' : '#ffffff';
  const rowAltBg = isDark ? '#1c2128' : '#F8FAFC';
  const borderColor = isDark ? '#2d333b' : '#E2E8F0';
  const textColor = isDark ? '#e0e0e0' : '#1a1a2e';
  const textSecondary = isDark ? '#b0b0b0' : '#374151';

  const cleanBold = (text: string) => {
    // Remove markdown bold markers but track if was bold
    const isBold = text.includes('**');
    const clean = text.replace(/\*\*/g, '');
    return { text: clean, isBold };
  };

  return (
    <View style={[tStyles.container, { borderColor }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={{ minWidth: minTableWidth }}>
          {/* Header */}
          <LinearGradient
            colors={[headerBg1, headerBg2] as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={tStyles.headerRow}>
            {headers.map((header, i) => {
              const { text } = cleanBold(header);
              return (
                <View
                  key={i}
                  style={[
                    tStyles.headerCell,
                    { width: colWidths[i] },
                    i < headers.length - 1 && { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.2)' },
                  ]}>
                  <Text style={tStyles.headerText} numberOfLines={2}>{text}</Text>
                </View>
              );
            })}
          </LinearGradient>

          {/* Rows */}
          {rows.map((row, rowIdx) => (
            <View
              key={rowIdx}
              style={[
                tStyles.dataRow,
                { backgroundColor: rowIdx % 2 === 0 ? rowBg : rowAltBg },
                rowIdx < rows.length - 1 && { borderBottomWidth: 1, borderBottomColor: borderColor },
              ]}>
              {row.map((cell, colIdx) => {
                const { text, isBold } = cleanBold(cell);
                const isFirstCol = colIdx === 0;
                return (
                  <View
                    key={colIdx}
                    style={[
                      tStyles.dataCell,
                      { width: colWidths[colIdx] },
                      colIdx < row.length - 1 && { borderRightWidth: 1, borderRightColor: borderColor },
                    ]}>
                    <Text
                      style={[
                        tStyles.dataText,
                        { color: isFirstCol || isBold ? textColor : textSecondary },
                        (isFirstCol || isBold) && { fontFamily: Fonts.semiBold },
                      ]}>
                      {text}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

/** Parse a markdown table string into headers and rows */
export function parseMarkdownTable(markdown: string): { headers: string[]; rows: string[][] } | null {
  const lines = markdown.trim().split('\n').filter(l => l.trim());
  if (lines.length < 3) return null;

  // Header row
  const headerLine = lines[0];
  // Separator row (|---|---|)
  const sepLine = lines[1];
  if (!sepLine.includes('---')) return null;

  const parseRow = (line: string): string[] => {
    return line
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell.length > 0);
  };

  const headers = parseRow(headerLine);
  const rows = lines.slice(2).map(parseRow);

  return { headers, rows };
}

const tStyles = StyleSheet.create({
  container: {
    marginVertical: 14,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
  },
  headerCell: {
    paddingVertical: 11,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 11.5,
    fontFamily: Fonts.bold,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  dataRow: {
    flexDirection: 'row',
  },
  dataCell: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  dataText: {
    fontSize: 12.5,
    fontFamily: Fonts.regular,
    lineHeight: 18,
  },
});
