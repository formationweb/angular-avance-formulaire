import { CanDeactivateFn, UrlTree } from "@angular/router";

export interface ComponentCanDeactivate {
    canDeactivate(): boolean
}

export const pendingChangesGuard: CanDeactivateFn<ComponentCanDeactivate> = (component): boolean => {
    if (component.canDeactivate()) {
        const bool = window.confirm('Etes vous sûr de quitter la page ?')
        return bool
    }
    return true
}