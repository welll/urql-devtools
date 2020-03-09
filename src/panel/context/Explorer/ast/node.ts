/** Copied from https://github.com/FormidableLabs/urql-exchange-graphcache/blob/master/src/ast/node.ts */

import {
  SelectionNode,
  SelectionSetNode,
  InlineFragmentNode,
  FieldNode,
  Kind
} from "graphql";

import { SelectionSet } from "./types";

/** Returns the SelectionSet for a given inline or defined fragment node */
export const getSelectionSet = (node: {
  selectionSet?: SelectionSetNode;
}): SelectionSet =>
  node.selectionSet !== undefined ? node.selectionSet.selections : [];

export const isFieldNode = (node: SelectionNode): node is FieldNode =>
  node.kind === Kind.FIELD;

export const isInlineFragment = (
  node: SelectionNode
): node is InlineFragmentNode => node.kind === Kind.INLINE_FRAGMENT;
