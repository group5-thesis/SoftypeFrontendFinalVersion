import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import './card.scss';
import {
  CCard,
} from "@coreui/react";

const StyledTreeExample = () => {

  return (
    <>
      <Tree
        lineWidth={'4px'}
        lineColor={'black'}
        lineBorderRadius={'20px'}
        label={<CCard className = "try">Try</CCard>}
      >
        <TreeNode label={<CCard>Child 1</CCard>}>
          <TreeNode label={<CCard>Grand Child</CCard>} />
        </TreeNode>
        <TreeNode label={<CCard>Child 2</CCard>}>
          <TreeNode label={<CCard>Grand Child</CCard>}>
            <TreeNode label={<CCard>Great Grand Child 1</CCard>} />
            <TreeNode label={<CCard>Great Grand Child 2</CCard>} />
          </TreeNode>
        </TreeNode>
        <TreeNode label={<CCard>Child 3</CCard>}>
          <TreeNode label={<CCard>Grand Child 1</CCard>} />
          <TreeNode label={<CCard>Grand Child 2</CCard>} />
        </TreeNode>
      </Tree>
    </>
  )
}
export default StyledTreeExample;