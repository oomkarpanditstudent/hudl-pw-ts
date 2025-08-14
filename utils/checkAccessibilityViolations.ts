import { expect } from '@playwright/test';

type Node = {
  html: string;
};

type Violation = {
  id: string;
  impact?: string | null;
  help: string;
  nodes: Node[];
};

export function checkAccessibilityViolations(violations: Violation[]) {
  const filteredViolations = violations.filter((v) =>
    ['critical', 'serious'].includes(v.impact ?? ''),
  );

  if (filteredViolations.length > 0) {
    console.log('Accessibility Violations:');
    for (const violation of filteredViolations) {
      console.log(`- ${violation.id} [${violation.impact}]`);
      console.log(`  Help: ${violation.help}`);
      console.log(`  Nodes:`);
      violation.nodes.forEach((node) => console.log(`    ${node.html}`));
    }
  }

  expect(filteredViolations).toHaveLength(0);
}
