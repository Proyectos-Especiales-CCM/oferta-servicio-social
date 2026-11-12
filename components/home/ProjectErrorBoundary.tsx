"use client"

import React from "react";

export default class ProjectErrorBoundary extends React.Component<
  { projectId: number; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[projects] No se pudo mostrar el proyecto', {
      projectId: this.props.projectId,
      error,
      componentStack: info.componentStack,
    });
  }

  render() {
    if (this.state.failed) {
      return (
        <div role="alert" className="col-span-12 sm:col-span-4 p-4 border rounded">
          No se pudo mostrar el proyecto {this.props.projectId}.
        </div>
      );
    }
    return this.props.children;
  }
}
