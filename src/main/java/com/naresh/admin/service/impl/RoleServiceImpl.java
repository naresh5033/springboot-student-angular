package com.naresh.admin.service.impl;

import com.naresh.admin.dao.RoleDao;
import com.naresh.admin.entity.Role;
import com.naresh.admin.service.RoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private RoleDao roleDao;

    public RoleServiceImpl(RoleDao roleDao) {

        this.roleDao = roleDao;
    }

    @Override
    public Role createRole(String roleName) {

        return roleDao.save(new Role(roleName));
    }
}
