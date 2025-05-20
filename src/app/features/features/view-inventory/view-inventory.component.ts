import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';
import { InventoryLevelService } from '../../../services/inventoryLevel.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-inventory',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-inventory.component.html',
  styleUrl: './view-inventory.component.scss'
})
export class ViewInventoryComponent implements OnInit {
  role: string = '';
  username: string = '';
  inventoryItems: any[] = [];
  filteredInventory: any[] = [];
  searchTerm: string = '';

  constructor(
    private inventorylevelService: InventoryLevelService,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (userdata) => {
        console.log('User:', userdata);
        this.username = userdata.username;
        this.role = userdata.role;
        
      },
      (error) => {
        console.error('Failed to fetch user data', error);
      }
    );
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventorylevelService.getAllInventory().subscribe(
      (data) => {
        this.inventoryItems = data;
        this.filteredInventory = data;
      },
      (error) => {
        console.error('Failed to load inventory:', error);
      }
    );
  }

  searchInventory(): void {
    if (!this.searchTerm.trim()) {
      this.filteredInventory = this.inventoryItems;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredInventory = this.inventoryItems.filter(
      (item) =>
        item.grade.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.paperNo.toString().includes(term) ||
        item.modelPaperId.toString().includes(term)
    );
  }

  updateInventory(item: any): void {
    // Navigate to update inventory page with the item ID
    this.router.navigate(['/inventory/update', item.modelPaperId]);
  }

  print(): void {
    window.print();
  }

  logout() {
    this.loginService.logout();
  }

  goToDashboard() {
    if (this.role === "ROLE_ADMIN") {
      this.router.navigate(['/dashboards/adminDashboard']);
    } else {
      this.router.navigate(['/dashboards/employeeDashboard']);
    }
  }
}