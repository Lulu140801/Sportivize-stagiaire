import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private authTokenKey = 'auth_token';
    private refreshTokenKey = 'refresh_token';

    constructor(private http: HttpClient, private router: Router) { }

    register(username: string, email: string, password: string): Observable<any> {
        const body = { username, email, password };
        return this.http.post<any>(`${this.apiUrl}/signup`, body);
    }

    login(email: string, password: string): Observable<any> {
        const body = { email, password };
        return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
            tap((response: any) => {
                this.saveToken(response.accessToken, response.refreshToken);
            })
        );
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token && this.isTokenValid(token);
    }

    private isTokenValid(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiration = payload.exp;
            if (!expiration) {
                return false;
            }

            const currentTime = Math.floor(Date.now() / 1000);
            return currentTime < expiration;
        } catch (error) {
            console.error('Erreur lors de la vérification du token:', error);
            return false;
        }
    }

    getToken(): string | null {
        return localStorage.getItem(this.authTokenKey);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.refreshTokenKey);
    }

    saveToken(accessToken: string, refreshToken: string): void {
        localStorage.setItem(this.authTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }

    logout(): void {
        localStorage.removeItem(this.authTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        this.router.navigate(['/']);
    }

    refreshAccessToken(): Observable<any> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken || !this.isTokenValid(refreshToken)) {
            throw new Error('Refresh token invalide, absent ou expiré. Veuillez vous reconnecter.');
        }

        return this.http.post<any>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
            tap((response: any) => {
                this.saveToken(response.accessToken, response.refreshToken);
            })
        );
    }

    getAuthHeaders(): HttpHeaders {
        const token = this.getToken();
        return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    }

    changePassword(currentPassword: string, newPassword: string): Observable<any> {
        const body = { currentPassword, newPassword };
        return this.http.post<any>(`${this.apiUrl}/change-password`, body, {
            headers: this.getAuthHeaders()
        });
    }
}
