# Tree CSS Deduplication Fix

## Problem
The district and industry trees had excessive width due to:
1. **Duplicate `.tree-node` CSS blocks** (two separate definitions)
2. **Conflicting class names**:
   - Old classes: `.expand-icon`, `.node-icon`, `.node-name`
   - New classes: `.tree-toggle`, `.tree-node-icon`, `.tree-node-label`

## Solution
Removed:
- First duplicate `.tree-node` CSS block (~800 chars)
- Old conflicting class rules (`.expand-icon`, `.node-icon`, `.node-name`, `.node-count`)

Preserved:
- Correct CSS with `.tree-toggle`, `.tree-node-label`, `.tree-node-icon`, `.tree-node-count`
- All tree functionality (expand/collapse, selection, etc.)

## Result
- ✅ Removed ~1.5KB of redundant CSS
- ✅ Consistent class names between JS and CSS
- ✅ Proper tree width rendering
- ✅ No conflicting style rules
